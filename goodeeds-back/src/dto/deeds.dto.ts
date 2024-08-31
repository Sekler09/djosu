import { IsString, IsEnum, MinLength, IsNotEmpty } from 'class-validator';
import { DeedType } from '@prisma/client';
import { PartialType } from '@nestjs/mapped-types';
import { Transform } from 'class-transformer';

export class CreateDeedDto {
  @IsString()
  @MinLength(10)
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  content: string;

  @IsEnum(DeedType)
  @IsNotEmpty()
  type: DeedType;
}

export class UpdateDeedDto extends PartialType(CreateDeedDto) {}
