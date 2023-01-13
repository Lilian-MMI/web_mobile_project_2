import { IsString } from 'class-validator';

export class postMessageDto {
  @IsString()
  content: string;

  @IsString()
  type: string;
}
