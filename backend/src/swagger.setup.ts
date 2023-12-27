import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default class SwaggerSetup {
  static apply(instance: INestApplication<any>) {
    const config = new DocumentBuilder()
      .setTitle('Documentação com Swagger - Fábrica de Sinapse')
      .setDescription(
        'O Swagger **(aka OpenApi)** é uma biblioteca muito conhecida no universo backend, estando disponível para diversas linguagens e frameworks. Ela gera um site interno no seu backend que descreve, com muitos detalhes, cada endpoint e estrutura de entidades presentes na sua aplicação.',
      )
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(instance, config);

    SwaggerModule.setup('api', instance, document);
    Logger.log('Mapped {/api} to Swagger documentation ', 'SwaggerSetup');
  }
}
