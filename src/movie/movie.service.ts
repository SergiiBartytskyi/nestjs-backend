import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from '@prisma/client';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MovieService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(): Promise<Movie[]> {
    return await this.prismaService.movie.findMany({
      where: {
        isAvailable: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
          },
        },
        poster: true,
      },
    });
  }

  async findById(id: string): Promise<Movie> {
    const movie = await this.prismaService.movie.findUnique({
      where: {
        id,
      },
      include: {
        actors: {
          select: {
            id: true,
            name: true,
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
          },
        },
        poster: true,
      },
    });

    if (!movie || !movie.isAvailable) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(dto: CreateMovieDto): Promise<Movie> {
    const {
      title,
      description,
      releaseYear,
      rating,
      genre,
      isAvailable,
      url,
      actorsIds,
    } = dto;
    if (!title || !releaseYear || !isAvailable || !actorsIds) {
      throw new NotFoundException('Missing required movie fields');
    }

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: actorsIds,
        },
      },
    });

    if (!actors || actors.length === 0) {
      throw new NotFoundException(
        'No valid actors found with the provided IDs',
      );
    }

    // let poster: MoviePoster | null = null;

    const movie = await this.prismaService.movie.create({
      data: {
        title,
        description,
        releaseYear,
        rating,
        genre,
        isAvailable,
        poster: url
          ? {
              create: {
                url: url,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
      include: {
        actors: true,
      },
    });

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto): Promise<boolean> {
    const movie = await this.findById(id);

    const actors = await this.prismaService.actor.findMany({
      where: {
        id: {
          in: dto.actorsIds,
        },
      },
    });

    if (!actors || actors.length === 0) {
      throw new NotFoundException(
        'No valid actors found with the provided IDs',
      );
    }
    await this.prismaService.movie.update({
      where: { id: movie.id },
      data: {
        ...dto,
        poster: dto.url
          ? {
              create: {
                url: dto.url,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
      },
    });

    return true;
  }
}
