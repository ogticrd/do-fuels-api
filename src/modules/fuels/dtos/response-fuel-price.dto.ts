import {
  IsNumber,
  IsDateString,
  IsString,
  IsBoolean,
  IsArray,
} from 'class-validator';
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
  @Transform(({ value }) => parseFloat(value).toFixed(2))
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
  updatedAt: Date;

  @Expose()
  @ApiProperty()
  @IsNumber()
  week: number;

  @Expose()
  @ApiProperty()
  @IsNumber()
  year: number;
}

@Exclude()
export class ResponseFuelPriceDto {
  @Expose()
  @ApiProperty({ type: Boolean })
  @IsBoolean()
  valid: boolean;

  @Expose()
  @ApiProperty({ type: FuelPriceMetaDto })
  @Type(() => FuelPriceMetaDto)
  meta: FuelPriceMetaDto;

  @Expose()
  @IsArray()
  @ApiProperty({
    type: PriceDto,
    isArray: true,
    maxLength: 1104,
    minLength: 23,
  })
  @Type(() => PriceDto)
  data: PriceDto[];
}
