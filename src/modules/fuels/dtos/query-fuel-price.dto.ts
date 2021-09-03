import { IsDate, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryFuelPriceDto {
  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  readonly date: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  readonly since: Date;

  @IsOptional()
  @IsDate()
  @ApiProperty({ required: false })
  readonly until: Date;

  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  readonly code: string;
}
