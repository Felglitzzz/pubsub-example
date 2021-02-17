import { IsEmpty, IsUUID, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubscriptionModel } from './subscription.model';

@Entity({ name: 'topic' })
export class TopicModel {
  @PrimaryGeneratedColumn('uuid')
  @IsUUID('4')
  id: string;

  @Column({ name: 'name', nullable: false, unique: true, type: 'text' })
  name: string;

  @OneToMany(() => SubscriptionModel, (subscription) => subscription.topic, {
    nullable: true,
  })
  subscription?: SubscriptionModel;

  constructor(topic?: TopicModel) {
    Object.assign(this, topic);
  }
}
