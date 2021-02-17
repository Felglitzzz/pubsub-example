import { IsUrl, IsUUID } from 'class-validator';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TopicModel } from './topic.model';

@Entity({ name: 'subscription' })
@Index(["url", "topic"], { unique: true })
export class SubscriptionModel {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @IsUrl()
  @Column({ name: 'url', nullable: false, type: 'text' })
  url: string;

  @ManyToOne(() => TopicModel, (topic) => topic.subscription, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'topic' })
  topic: TopicModel;
}
