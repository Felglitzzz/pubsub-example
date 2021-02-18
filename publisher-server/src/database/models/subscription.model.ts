import { IsUrl, IsUUID } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiPropertyOptional()
  id: string;

  @IsUrl()
  @Column({ name: 'url', nullable: false, type: 'text' })
  @ApiProperty()
  url: string;

  @ManyToOne(() => TopicModel, (topic) => topic.subscription, {
    eager: true,
    nullable: false,
  })
  @JoinColumn({ name: 'topic' })
  @ApiProperty({ type: () => TopicModel })
  topic: TopicModel;
}
