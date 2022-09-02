import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional } from 'class-validator';

export class getHitsDTO {
  //*
  @ApiProperty({
    description: 'Author of the news',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString()
  public author: string;

  //*
  @ApiProperty({
    description: 'Title of the news',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  @IsString()
  public title: string;
}
