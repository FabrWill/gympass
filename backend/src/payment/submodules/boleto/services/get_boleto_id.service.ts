import { InjectDataSource } from '@nestjs/typeorm';
import { ApiConfigService } from 'src/config/api_config.service';
import { DataSource } from 'typeorm';

export default class GetBoletoIdService {
  constructor(
    @InjectDataSource()
    private datasource: DataSource,

    private readonly config: ApiConfigService,
  ) {}

  /**
   * Execute
   * Get the next sequential number of boleto in database
   * Format as request from banco do brasil to pass through innpay
   * needs to pass 000 + agreement_number + sequential_number in 10 digits
   * documentation for that:
   * https://apoio.developers.bb.com.br/referency/post/5f4fb7f5b71fb5001268ca44
   */
  async execute() {
    const boletoId = await this.incrementSequentialNumberOfBoletoInDatabase();

    const { agreement_number } = this.config.innpay;
    const serializedBoletoId = boletoId.trim().padStart(10, '0');

    return `000${agreement_number}${serializedBoletoId}`;
  }

  async incrementSequentialNumberOfBoletoInDatabase() {
    try {
      const query = await this.datasource.query(
        `SELECT EE_FAXATU, R_E_C_N_O_ FROM SEE010 WHERE EE_CODIGO  = '001'`,
      );

      const result = query[0];
      const boletoId = Number.parseInt(result.EE_FAXATU) + 1;

      await this.datasource.query(
        `UPDATE SEE010 SET EE_FAXATU = ${boletoId} WHERE R_E_C_N_O_ = ${result.R_E_C_N_O_}`,
      );

      return `${boletoId}`;
    } catch (error) {
      console.error('GetBoletoIdService::execute - ', error);
    }
  }
}
