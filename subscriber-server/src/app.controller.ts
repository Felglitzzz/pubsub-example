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

  @Post('test1')
  async handleEvents1(
    @Body() payload: Payload,
  ): Promise<void> {
    return this.appService.handlePayload(payload, );
  }

  @Post('test2')
  async handleEvents2(
    @Body() payload: Payload,
  ): Promise<void> {
    return this.appService.handlePayload(payload);
  }
}
