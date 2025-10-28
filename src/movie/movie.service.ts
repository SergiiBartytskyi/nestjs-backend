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
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      skip: 0,
      take: 20,
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
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
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
      imageUrl,
      actorsIds,
    } = dto;
    if (!title || !releaseYear || !actorsIds) {
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
        poster: imageUrl
          ? {
              create: {
                url: imageUrl,
              },
            }
          : undefined,
        actors: {
          connect: actors.map((actor) => ({ id: actor.id })),
        },
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
        poster: {
          select: {
            id: true,
            url: true,
          },
        },
      },
    });

    return movie;
  }

  async update(id: string, dto: UpdateMovieDto): Promise<Movie> {
    const { actorsIds, imageUrl, ...restDto } = dto;
    const movie = await this.findById(id);

    if (actorsIds && actorsIds.length > 0) {
      const actors = await this.prismaService.actor.findMany({
        where: {
          id: {
            in: actorsIds,
          },
        },
      });

      if (actors.length !== actorsIds.length) {
        throw new NotFoundException('Some actor IDs are invalid or not found');
      }
    }

    const updatedMovie = await this.prismaService.movie.update({
      where: {
        id: movie.id,
      },
      data: {
        ...restDto,
        ...(imageUrl && {
          poster: {
            upsert: {
              create: { url: imageUrl },
              update: { url: imageUrl },
            },
          },
        }),
        ...(actorsIds &&
          actorsIds.length > 0 && {
            actors: {
              set: actorsIds.map((id) => ({ id })),
            },
          }),
      },
    });
    return updatedMovie;
  }

  async delete(id: string): Promise<Movie> {
    const movie = await this.findById(id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    await this.prismaService.movie.delete({
      where: {
        id,
      },
    });

    return movie;
  }
}
