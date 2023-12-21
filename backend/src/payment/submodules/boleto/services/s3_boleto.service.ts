import { InjectS3, S3 } from 'nestjs-s3';
import { ApiConfigService } from 'src/config/api_config.service';

export default class S3BoletoService {
  constructor(
    private readonly config: ApiConfigService,
    @InjectS3()
    private readonly storage: S3,
  ) {}

  async upload(contentInBase64: string, filename: string) {
    try {
      const buffer = Buffer.from(contentInBase64, 'base64');

      await this.storage.putObject({
        Bucket: this.config.S3Config.bucket,
        Key: `boleto/${filename}.pdf`,
        Body: buffer,
        ACL: 'public-read',
        ContentType: 'application/pdf',
      });
    } catch (error) {
      console.error('SaveBoletoOnDiskService::upload - ', error);
    }
  }

  async read(filename: string) {
    try {
      const result = await this.storage.getObject({
        Bucket: this.config.S3Config.bucket,
        Key: `boleto/${filename}.pdf`,
      });

      return result.Body as NodeJS.ReadableStream;
    } catch (error) {
      console.error('SaveBoletoOnDiskService::read - ', error);
    }
  }
}
