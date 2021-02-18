import { IsUUID } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionModel } from './subscription.model';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'topic' })
export class TopicModel {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  @ApiPropertyOptional()
  id: string;

  @Column({ name: 'name', nullable: false, unique: true, type: 'text' })
  @ApiProperty()
  name: string;

  @OneToMany(() => SubscriptionModel, (subscription) => subscription.topic, {
    nullable: true,
  })
  @ApiPropertyOptional({ type: () => [SubscriptionModel]})
  subscription?: SubscriptionModel;

  constructor(topic?: TopicModel) {
    Object.assign(this, topic);
  }
}
