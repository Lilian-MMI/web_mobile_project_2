import { IsString } from 'class-validator';

export class createChannelDto {
  @IsString()
  name: string;
}
