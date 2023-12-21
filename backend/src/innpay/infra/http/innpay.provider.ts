import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ApiConfigService } from 'src/config/api_config.service';
import { AxiosResponse } from 'axios';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class InnpayProvider {
  private access = {
    refresh_token: '',
    access_token: '',
  };

  constructor(
    private httpService: HttpService,
    private configService: ApiConfigService,
    private jwt: JwtService,
  ) {}

  isTokenExpired(token: string): boolean {
    const decoded: any = this.jwt.decode(token);

    return decoded && decoded.exp < Date.now() / 1000;
  }

  public async request<T>(
    method: 'get' | 'post' | 'patch',
    url: string,
    data: any,
  ) {
    if (
      !this.access.access_token ||
      this.isTokenExpired(this.access.access_token)
    ) {
      await this.login();
    }

    const config = {
      headers: {
        Authorization: `bearer ${this.access.access_token}`,
      },
      timeout: 1000 * 60,
    };

    const response: Promise<AxiosResponse<T>> = this.httpService.axiosRef[
      method
    ](
      `/${url}`,
      method == `get` ? config : data,
      method == `get` ? undefined : config,
    );

    const result: any = await response;

    const info: T = result.data;

    return info;
  }

  private async login() {
    try {
      const loginRequest = new Promise((resolve, reject) => {
        this.httpService.axiosRef
          .post(`/auth/login`, {
            email: this.configService.innpayConfig.user,
            password: this.configService.innpayConfig.password,
          })
          .then(resolve)
          .catch(reject);
      });

      const info: any = await loginRequest;

      this.access.refresh_token = info.data.refresh_token;
      this.access.access_token = info.data.access_token;
    } catch (error) {
      console.error('InnpayProvider::login - ', error);
      throw new HttpException(error, 401);
    }
  }
}
