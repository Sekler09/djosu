import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
  Matches,
} from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  @Length(5, 15)
  @IsNotEmpty()
  @Matches(/^\S+$/)
  username: string;

  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  password: string;
}

export class UpdateAccountDto extends PartialType(CreateAccountDto) {}
