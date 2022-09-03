import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsInt } from 'class-validator';

export class deleteHitDTO {
  //*
  @ApiProperty({
    description: 'Created at Identifier',
    required: true,
  })
  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  public created_at_i: number;
}
