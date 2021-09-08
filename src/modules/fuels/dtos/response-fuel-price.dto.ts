import { IsNumber, IsDateString, IsString, IsBoolean } from 'class-validator';
import { Exclude, Expose, Type, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { DR_CURRENCY } from '@constants/index';

@Exclude()
class PriceDto {
  @Expose()
  @ApiProperty()
  @IsNumber()
  id: number;

  @IsString()
  @Expose()
  @ApiProperty()
  @Transform(({ obj: { fuel } }) => {
    return fuel['name'];
  })
  name: string;

  @IsString()
  @Expose()
  @ApiProperty()
  @Transform(({ obj: { fuel } }) => {
    return fuel['code'];
  })
  code: string;

  @Transform(() => DR_CURRENCY)
  @Expose()
  @ApiProperty()
  @IsString()
  currency: number;

  @Expose()
  @IsNumber()
  @ApiProperty()
  price: number;

  @Expose()
  @ApiProperty()
  @IsDateString()
  date: Date;
}

@Exclude()
class FuelPriceMetaDto {
  @Expose()
  @ApiProperty()
  @IsString()
  source: string;

  @Expose()
  @ApiProperty()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  @IsNumber()
  week: number;
}

@Exclude()
export class ResponseFuelPriceDto {
  @Expose()
  @ApiProperty()
  @IsBoolean()
  valid: boolean;

  @Expose()
  @ApiProperty()
  @Type(() => FuelPriceMetaDto)
  meta: FuelPriceMetaDto;

  @Expose()
  @ApiProperty()
  @Type(() => PriceDto)
  data: PriceDto;
}
