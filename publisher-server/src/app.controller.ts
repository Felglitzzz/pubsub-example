import { Body, Controller, Get, Param, Post, UsePipes } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
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

  @Post('subscribe/:topic')
  async subscribeHandlerEndpointDto(
    @Param() params: PublishTopicParamsDto,
    @Body() subscribeDto: SubscribeHandlerEndpointDto,
  ): Promise<SubscribeResponse> {
    const { topic } = params;
    return this.appService.subscribeHandlerEndpoint(topic, subscribeDto);
  }

  @Post('publish/:topic')
  @UsePipes(PublishTopicPipe)
  @ApiBody({ type: Object })
  publishTopic(
    @Param() params: PublishTopicParamsDto,
    @Body() publishTopicDto: {
      [key: string]: any
    },
  ): Promise<PublishResponse> {
    const { topic } = params;
    return this.appService.publishTopic(topic, publishTopicDto);
  }
}
