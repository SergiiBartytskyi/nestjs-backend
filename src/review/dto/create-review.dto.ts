import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @ApiProperty({
    example: 'Great movie!',
    description: 'The comment of the review',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;

  @ApiProperty({
    example: 4.5,
    description: 'The rating of the review',
    minimum: 0,
    maximum: 10,
    type: 'number',
    format: 'float',
  })
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10)
  rating: number;

  @ApiProperty({
    example: 'movie123',
    description: 'The ID of the movie being reviewed',
    type: 'string',
    format: 'uuid',
  })
  @IsUUID('4')
  movieId: string;
}
