import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class QueryFuelPriceDto {
  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
    description: 'Format: YYYY-MM-DD',
  })
  readonly date: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
    description: 'Format: YYYY-MM-DD',
  })
  readonly since: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
    description: 'Format: YYYY-MM-DD',
  })
  readonly until: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly code: string;
}
