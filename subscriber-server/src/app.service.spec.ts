import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from './app.service';
import { Payload } from './dtos';
import { inspect } from 'util';

describe('App Service', () => {
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    })
    .compile();

    appService = app.get<AppService>(AppService);
  });

  beforeEach(() => jest.clearAllMocks())

  describe('App Service', () => {
    describe('getHello()', () => {
      it('should return welcome message', () => {
        const response = appService.getHello();
        expect(response).toHaveProperty('message', 'welcome to the subscriber server');
      });

      it('should handle payload', () => {
        const logSpy = jest.spyOn(console, 'log');
        const payload: Payload = { topic: 'aTopic', data: { message: 'some message' } };
        const parsedPayload = inspect(payload, false, null, true);

        appService.handlePayload(payload);

        expect(logSpy).toHaveBeenCalledWith(`Event Data Received: ${parsedPayload}`)
      });
    })
  });
});
