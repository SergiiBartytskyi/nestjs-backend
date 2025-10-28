import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from '@prisma/client';

@Injectable()
export class ReviewService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: CreateReviewDto): Promise<Review> {
    const { comment, rating, movieId } = dto;

    if (!comment || !rating || !movieId) {
      throw new BadRequestException('Missing required fields');
    }

    return await this.prismaService.review.create({
      data: {
        comment,
        rating,
        movie: {
          connect: {
            id: movieId,
          },
        },
      },
    });
  }
}
