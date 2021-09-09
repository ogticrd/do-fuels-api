import { IsNumber, IsString, IsBoolean, IsDate } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
class Data {
  @Expose()
  @ApiProperty({ type: Number, default: 400 })
  @IsNumber()
  statusCode: number;

  @Expose()
  @ApiProperty({ type: String })
  @IsString()
  message: string | string[];

  @Expose()
  @ApiProperty({ type: Date })
  @IsDate()
  timestamp: Date;
}

@Exclude()
export class BadRequestResponseDto {
  @Expose()
  @ApiProperty({ type: Boolean, default: false })
  @IsBoolean()
  valid: boolean;

  @Expose()
  @ApiProperty({ type: Data })
  @Type(() => Data)
  data: Data;
}
