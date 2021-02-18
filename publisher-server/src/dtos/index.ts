import { IsNotEmpty, IsString, registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export function IsUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          let url;
          try {
            url = new URL(value);
          } catch (_) {
            return false;  
          }
        
          return url.protocol === "http:" || url.protocol === "https:";
        },
      },
    });
  };
}

export class SubscribeHandlerEndpointDto {
  @IsUrl({ message: "url should be valid"})
  @IsNotEmpty()
  @ApiProperty()
  url: string;
}

export class PublishTopicParamsDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  topic: string;
}

export class SubscribeResponse {
  @ApiProperty()
  url: string;

  @ApiProperty()
  topic: string;
}

export class PublishPayload {
  @ApiProperty()
  topic: string;

  @ApiProperty()
  data: { [key: string]: any };
}

export class PublishResponse {
  @ApiProperty()
  statusCode: number;

  @ApiProperty()
  message: string;
}
