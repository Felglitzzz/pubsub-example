import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import {
  PublishResponse,
  PublishTopicParamsDto,
  SubscribeHandlerEndpointDto,
  SubscribeResponse,
} from './dtos';
import { IHelloMessageResponse } from './interfaces';
import { PublishTopicPipe } from './pipes';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): IHelloMessageResponse {
    return this.appService.getHello();
  }

  @Post('api/v1/subscribe/:topic')
  async subscribeHandlerEndpointDto(
    @Param() params: PublishTopicParamsDto,
    @Body() subscribeDto: SubscribeHandlerEndpointDto,
  ): Promise<SubscribeResponse> {
    const { topic } = params;
    return this.appService.subscribeHandlerEndpoint(topic, subscribeDto);
  }

  @Post('api/v1/publish/:topic')
  @UsePipes(PublishTopicPipe)
  publishTopic(
    @Param() params: PublishTopicParamsDto,
    @Body() publishTopicDto: { [key: string]: any },
  ): Promise<PublishResponse> {
    const { topic } = params;
    return this.appService.publishTopic(topic, publishTopicDto);
  }
}
