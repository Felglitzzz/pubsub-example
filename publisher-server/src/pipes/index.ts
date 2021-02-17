import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class PublishTopicPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if( metadata.type === 'body' && !Object.keys(value)?.length)
    throw new BadRequestException('Request body cannot be empty!')
    return value;
  }
}