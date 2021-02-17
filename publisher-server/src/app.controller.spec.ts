import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const managerMock = {
  save: jest.fn(),
  find: jest.fn(),
};

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, EntityManager],
    })
    .overrideProvider(EntityManager)
    .useValue(managerMock)
    .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('App Controller', () => {
    describe('getHello()', () => {
      it('should return welcome message', () => {
        const response = appController.getHello();
        expect(response).toHaveProperty('message', 'welcome to the publisher server');
      })
    })

    // describe('PublishTopicPipe', () => {
    //   it('should publish if no subscribers', () => {
    //     co
    //   })

    // })
  });
});
