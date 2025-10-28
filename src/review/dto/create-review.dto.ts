import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  @Max(10)
  rating: number;

  @IsUUID('4')
  movieId: string;
}
