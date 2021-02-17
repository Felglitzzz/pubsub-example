import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './app.module';
import { AppService } from './app.service';

describe('App Controller', () => {
  let app: INestApplication;
  const appServiceMock = { 
    publishTopic: jest.fn(),
    subscribeHandlerEndpoint: jest.fn(),
    getHello: jest.fn().mockReturnValue({ message: 'welcome to the publisher server' }),
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
        expect(response.body).toHaveProperty('message', 'welcome to the publisher server')

      });
  });

  describe('/POST /api/v1/publish/:topic', () => {
    it(`should throw error if no body is passed`, () => {
      return request(app.getHttpServer())
        .post('/api/v1/publish/topic1')
        .send({})
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('statusCode', 400);
          expect(response.body).toHaveProperty('message', 'Request body cannot be empty!')
          expect(response.body).toHaveProperty('error', 'Bad Request')
        });
    });

    it(`should published passed message to topic`, () => {
      const topic = 'aTopic';
      const message = { msg: 'message payload' };
      return request(app.getHttpServer())
        .post(`/api/v1/publish/${topic}`)
        .send(message)
        .expect(201)
        .expect(() => {
          expect(appServiceMock.publishTopic).toHaveBeenCalledWith(topic, message);
        });
    });
  })

  describe('/POST /api/v1/subscribe/:topic', () => {
    it(`should throw error if no body is passed`, () => {
      return request(app.getHttpServer())
        .post('/api/v1/subscribe/topic1')
        .send({})
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('statusCode', 400);
          expect(response.body).toHaveProperty('message', ["url should not be empty", "url should be valid"])
          expect(response.body).toHaveProperty('error', 'Bad Request')
        });
    });

    it(`should throw error if url is invalid`, () => {
      return request(app.getHttpServer())
        .post('/api/v1/subscribe/topic1')
        .send({ url: 'invalidUrl' })
        .expect(400)
        .expect((response) => {
          expect(response.body).toHaveProperty('statusCode', 400);
          expect(response.body).toHaveProperty('message', ['url should be valid'])
          expect(response.body).toHaveProperty('error', 'Bad Request')
        });
    });

    it(`should subscribe a url client to a topic`, () => {
      const url = 'http://localhost:3001/test1';
      const topic = 'aTopic'
      return request(app.getHttpServer())
        .post(`/api/v1/subscribe/${topic}`)
        .send({ url })
        .expect(201)
        .expect(() => {
          expect(appServiceMock.subscribeHandlerEndpoint(topic, { url }))
        });
    });

  })

});