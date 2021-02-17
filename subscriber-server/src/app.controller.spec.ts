import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppService } from './app.service';
import { inspect } from 'util';

describe('App Controller', () => {
  let app: INestApplication;
  const appServiceMock = { 
    handlePayload: jest.fn(),
    getHello: jest.fn().mockReturnValue({ message: 'welcome to the subscriber server' }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useValue(appServiceMock)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(`/GET /`, () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect((response) => {
        expect(response.body).toHaveProperty('message', 'welcome to the subscriber server')

      });
  });

  describe('/POST /api/v1/test1', () => {
    it(`handle event payload passed to it`, () => {
      const payload = { message: "some payload" };
      return request(app.getHttpServer())
        .post('/api/v1/test1')
        .send(payload)
        .expect(201)
        .expect(() => {
          expect(appServiceMock.handlePayload).toHaveBeenCalledWith(payload)
        });
    });
  })

  describe('/POST /api/v1/test2', () => {
    it(`handle event payload passed to it`, () => {
      const payload = { message: "some payload" };
      return request(app.getHttpServer())
        .post('/api/v1/test2')
        .send(payload)
        .expect(201)
        .expect(() => {
          expect(appServiceMock.handlePayload).toHaveBeenCalledWith(payload)
        });
    });
  })
});
