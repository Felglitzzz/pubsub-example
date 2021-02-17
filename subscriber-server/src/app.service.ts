import { Injectable } from '@nestjs/common';
import { Payload } from './dtos';
import { IHelloMessageResponse } from './interfaces';
import { inspect } from 'util';

@Injectable()
export class AppService {
  getHello(): IHelloMessageResponse {
    return {
      message: 'welcome to the subscriber server',
    };
  }

  handlePayload(payload: Payload): void {
    const parsedPayload = inspect(payload, false, null, true);
    console.log(`Event Data Received: ${parsedPayload}`);
  }
}
