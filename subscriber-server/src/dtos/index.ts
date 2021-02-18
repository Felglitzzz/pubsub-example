import { ApiProperty } from '@nestjs/swagger';
export class Payload {
  @ApiProperty()
  topic: string;

  @ApiProperty()
  data: { [key: string]: any };
}
