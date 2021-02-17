import { Test, TestingModule } from '@nestjs/testing';
import { EntityManager } from 'typeorm';
import { AppService } from './app.service';
import { SubscriptionModel } from './database/models/subscription.model';
import { TopicModel } from './database/models/topic.model';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const managerMock = {
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(() => ({
    where: jest.fn().mockReturnThis(),
    leftJoinAndSelect: jest.fn().mockReturnThis(),
    getMany: jest.fn(),
  })),
};

describe('App Service', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService, EntityManager],
    })
    .overrideProvider(EntityManager)
    .useValue(managerMock)
    .compile();

    appService = app.get<AppService>(AppService);
  });

  beforeEach(() => jest.clearAllMocks())

  describe('App Service', () => {
    describe('getHello()', () => {
      it('should return welcome message', () => {
        const response = appService.getHello();
        expect(response).toHaveProperty('message', 'welcome to the publisher server');
      })
    })

    describe('publishTopic()', () => {
      it('should publish if no subscribers', async () => {
        const topic = 'aTopic';
        const dto = { msg: 'some message' };
        const response = await appService.publishTopic(topic, dto);
        expect(response).toHaveProperty('statusCode', 200);
        expect(response).toHaveProperty('message', `Publish to ${topic} successful`);
      })

      it('should publish if there are subscribers', async () => {
        const subscriptions: SubscriptionModel[] = [
          { url: 'http://localhost:1111', id: 'subscriptionId1', topic: new TopicModel({ name: 'topic1', id: 'topicId' }) },
          { url: 'http://localhost:2222', id: 'subscriptionId2', topic: new TopicModel({ name: 'topic2', id: 'topicId2' }) },
          { url: 'http://localhost:3333', id: 'subscriptionId3', topic: new TopicModel({ name: 'topic3', id: 'topicId3' }) },
          { url: 'http://localhost:4444', id: 'subscriptionId4', topic: new TopicModel({ name: 'topic4', id: 'topicId4' }) }
        ]

        managerMock.createQueryBuilder.mockReturnValue({
          leftJoinAndSelect: jest.fn().mockReturnThis(),
          where: jest.fn().mockReturnThis(),
          getMany: jest
            .fn()
            .mockResolvedValueOnce(subscriptions),
        })
        const topic = 'aTopic';
        const dto = { msg: 'some message' };
        const response = await appService.publishTopic(topic, dto);

        expect (mockedAxios.post).toHaveBeenCalledTimes(subscriptions.length);
      })
    })

    describe('subscribeHandlerEndpoint()', () => {
      it('should save new topic if it does not exist and subscribe client url to a topic', async () => {
        const topic = 'aTopic';
        const dto = { url: 'http://localhost:1234' };

        managerMock.findOne.mockResolvedValueOnce(null);
        managerMock.save.mockResolvedValue({ id: 'topicId', url: dto.url, topic: new TopicModel({ id: 'topicId', name: topic })});

        const response = await appService.subscribeHandlerEndpoint(topic, dto);
        expect(response).toHaveProperty('url', dto.url);
        expect(response).toHaveProperty('topic', topic);
        expect(managerMock.save).toHaveBeenCalledTimes(2);
      })

      it('should not save already existing topic and subscribe client url to the existing topic', async () => {
        const topic = new TopicModel({ id: 'topicId', name: 'aTopic' });
        const dto = { url: 'http://localhost:1234' };

        managerMock.findOne.mockResolvedValueOnce(topic);
        managerMock.save.mockResolvedValueOnce({ id: 'topicId', url: dto.url, topic: new TopicModel({ id: 'topicId', name: topic.name })});

        const response = await appService.subscribeHandlerEndpoint(topic.name, dto);
        expect(response).toHaveProperty('url', dto.url);
        expect(response).toHaveProperty('topic', topic.name);
        expect(managerMock.save).toHaveBeenCalledTimes(1);
      })
    })
  });
});
