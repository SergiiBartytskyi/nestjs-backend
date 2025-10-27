import { Genre } from '@prisma/client';

export class CreateMovieDto {
  title: string;
  description: string;
  releaseYear: number;
  rating: number;
  genre: Genre;
  isAvailable: boolean;
  url: string;
  actorsIds: string[];
}
