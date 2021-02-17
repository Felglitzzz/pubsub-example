import { IsNotEmpty, IsString, registerDecorator, ValidationOptions, ValidationArguments, validate } from 'class-validator';

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
  url: string;
}

export class PublishTopicParamsDto {
  @IsString()
  @IsNotEmpty()
  topic: string;
}

export class SubscribeResponse {
  url: string;
  topic: string;
}

export class PublishPayload {
  topic: string;
  data: { [key: string]: any };
}

export class PublishResponse {
  statusCode: number;
  message: string;
}
