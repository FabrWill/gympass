import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaymentMethod } from '../domain/enum/payment.enum';
import { Order } from '../domain/entities/order.entity';
import { UpdatePaymentMethodByCartController } from '../infra/controllers/update_payment_method_by_cart.controller';
import { UpdatePaymentMethodByCartService } from '../services/update_payment_method_by_cart.service';

describe('UpdatePaymentMethodByCartController (e2e)', () => {
  let app: INestApplication;
  let service: UpdatePaymentMethodByCartService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [UpdatePaymentMethodByCartController],
      providers: [
        UpdatePaymentMethodByCartService,
        {
          provide: getRepositoryToken(Order),
          useValue: {
            findOneOrFail: jest.fn(),
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    service = moduleFixture.get<UpdatePaymentMethodByCartService>(
      UpdatePaymentMethodByCartService,
    );
  });

  it('/payment_methods (PUT) should update payment method successfully', () => {
    const updatePaymentDto = {
      cart_id: 'cart-id',
      payment_method: PaymentMethod.BOLETO,
    };
    jest
      .spyOn(service, 'execute')
      .mockImplementation(async () => 'some result');

    return request(app.getHttpServer())
      .put('/payment_methods')
      .send(updatePaymentDto)
      .expect(HttpStatus.OK);
  });

  it('/payment_methods (PUT) should return 404 if cart not found', () => {
    const updatePaymentDto = {
      cart_id: 'invalid-cart-id',
      payment_method: PaymentMethod.PIX,
    };
    jest.spyOn(service, 'execute').mockImplementation(async () => {
      throw new Error('Cart not found');
    });

    return request(app.getHttpServer())
      .put('/payment_methods')
      .send(updatePaymentDto)
      .expect(HttpStatus.NOT_FOUND);
  });

  afterAll(async () => {
    await app.close();
  });
});
