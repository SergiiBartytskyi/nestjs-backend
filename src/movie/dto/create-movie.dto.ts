import { Genre } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsNotEmpty()
  @Min(1888)
  @Max(new Date().getFullYear())
  releaseYear: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  @Min(0)
  @Max(10)
  rating: number;

  @IsEnum(Genre)
  genre: Genre;

  @IsBoolean()
  @IsOptional()
  isAvailable: boolean;

  @IsString()
  @IsOptional()
  imageUrl: string;

  @IsArray()
  @IsUUID('4', { each: true })
  actorsIds: string[];
}
