import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { EntityManager } from 'typeorm';
import { SubscriptionModel } from './database/models/subscription.model';
import { TopicModel } from './database/models/topic.model';
import {
  PublishPayload,
  PublishResponse,
  SubscribeHandlerEndpointDto,
  SubscribeResponse,
} from './dtos';
import { IHelloMessageResponse } from './interfaces';

@Injectable()
export class AppService {
  constructor(private entityManager: EntityManager) {}
  getHello(): IHelloMessageResponse {
    return {
      message: 'welcome to the publisher server',
    };
  }

  async publishTopic(
    topic: string,
    publishTopicDto: {
      [key: string]: any;
    },
  ): Promise<PublishResponse> {
    const subscriptions = await this.entityManager
      .createQueryBuilder(SubscriptionModel, 'subscription')
      .leftJoinAndSelect('subscription.topic', 'topic')
      .where('topic.name = :name', { name: topic })
      .getMany();

    if (!subscriptions?.length)
      return {
        statusCode: 200,
        message: `Publish to ${topic} successful`,
      };

      for (const subscription of subscriptions) {
        try {
          const payload: PublishPayload = {
            topic,
            data: publishTopicDto,
          };
          await axios.post(subscription.url, payload);
        } catch (e){
        }
      }
      return {
        statusCode: 200,
        message: `Publish to ${topic} successful`,
      };
  }

  async subscribeHandlerEndpoint(
    topicName: string,
    subscribeDto: SubscribeHandlerEndpointDto,
  ): Promise<SubscribeResponse> {
    let topic: TopicModel;

    topic = await this.entityManager.findOne(TopicModel, {
      name: topicName,
    });

    if (!topic) {
      const topicInstance = new TopicModel();
      topicInstance.name = topicName;
      topic = await this.entityManager.save(TopicModel, topicInstance);
    }

    const subscriptionInstance = new SubscriptionModel();
    subscriptionInstance.topic = topic;
    subscriptionInstance.url = subscribeDto.url;

    const newSubscription = await this.entityManager.save(
      SubscriptionModel,
      subscriptionInstance,
    );
    
    return {
      url: newSubscription.url,
      topic: newSubscription.topic.name,
    };
  }
}
