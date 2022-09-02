import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsOptional, IsNotEmpty, IsInt, Min } from 'class-validator';

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

  //*
  @ApiProperty({
    description: 'Number of the page',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  public pageNumber: number;
}
