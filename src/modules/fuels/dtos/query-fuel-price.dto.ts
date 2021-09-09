import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryFuelPriceDto {
  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
    description:
      'Price effective date. This parameter allows a search through the effective price date.',
    example: '2021-01-01',
    format: 'YYYY-MM-DD',
  })
  readonly date: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
    description:
      'Since price effective date. This parameter allows a search through the effective price date.',
    example: '2021-01-01',
    format: 'YYYY-MM-DD',
  })
  readonly since: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({
    required: false,
    type: Date,
    description:
      'Until price effective date. This parameter allows a search through the effective price date.',
    example: '2021-02-02',
    format: 'YYYY-MM-DD',
  })
  readonly until: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({
    required: false,
    type: String,
    description:
      'Fuel code. This parameter allows a search through the fuel code',
    example: 'PGACU00',
  })
  readonly code: string;
}
