import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DataSourceOptions } from 'typeorm';

@Injectable()
export default class ApplicationConfigService {
  constructor(private config: ConfigService) {}

  get databaseSettings(): Partial<DataSourceOptions> {
    return {
      type: this.config.get('DATABASE_TYPE') as any,
      host: this.config.get('DATABASE_HOST'),
      port: this.config.get('DATABASE_PORT'),
      username: this.config.get('DATABASE_USERNAME'),
      password: `${this.config.get('DATABASE_PASSWORD')}`,
      database: `${this.config.get('DATABASE_NAME')}`,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }
}
