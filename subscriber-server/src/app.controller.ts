import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { IHelloMessageResponse } from './interfaces';
import {
  Payload,
} from './dtos';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IHelloMessageResponse {
    return this.appService.getHello();
  }

  @Post('api/v1/test1')
  async handleEvents1(
    @Body() payload: Payload,
  ): Promise<void> {
    // console.log('pay-->>', payload);
    return this.appService.handlePayload(payload, );
  }

  @Post('api/v1/test2')
  async handleEvents2(
    @Body() payload: Payload,
  ): Promise<void> {
    return this.appService.handlePayload(payload);
  }
}
