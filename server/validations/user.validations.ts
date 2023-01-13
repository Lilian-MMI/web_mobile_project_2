import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class userLoginDto {
  @IsString()
  username: string;

  @IsString()
  password: string;
}

export class userRegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class userEditDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  email: string;
}
