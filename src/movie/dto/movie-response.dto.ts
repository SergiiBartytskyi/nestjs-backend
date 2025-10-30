import { ApiProperty } from '@nestjs/swagger';
import { Genre } from '@prisma/client';

export class MovieResponseDto {
  @ApiProperty({
    example: 'Inception',
    description: 'The title of the movie',
    type: 'string',
  })
  title: string;

  @ApiProperty({
    example: 'A mind-bending thriller about dream invasion.',
    description: 'The description of the movie',
    type: 'string',
  })
  description: string;

  @ApiProperty({
    example: 2010,
    description: 'The release year of the movie',
    type: 'integer',
  })
  releaseYear: number;

  @ApiProperty({
    example: 8.8,
    description: 'The rating of the movie',
    type: 'number',
  })
  rating: number;

  @ApiProperty({
    example: Genre.SCI_FI,
    description: 'The genre of the movie',
    enum: Genre,
  })
  genre: Genre;

  @ApiProperty({
    example: true,
    description: 'Indicates if the movie is available for streaming',
    type: 'boolean',
  })
  isAvailable: boolean;

  @ApiProperty({
    example: 'https://example.com/image.jpg',
    description: 'The URL of the movie poster image',
    type: 'string',
  })
  imageUrl: string;

  @ApiProperty({
    example: ['550e8400-e29b-41d4-a716-446655440000'],
    description: 'Array of actor IDs associated with the movie',
    type: [String],
    items: { type: 'string', format: 'uuid' },
  })
  actorsIds: string[];
}
