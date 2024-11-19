import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class EnvironmentSchema {
  @IsNumber()
  @IsNotEmpty()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  NODE_ENV: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_DB: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_USER: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  POSTGRES_HOST: string;

  @IsNumber()
  @IsNotEmpty()
  POSTGRES_PORT: number;
}
