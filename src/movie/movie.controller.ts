import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Genre } from '@prisma/client';
import { MovieResponseDto } from './dto/movie-response.dto';

@ApiTags('Movies')
@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @ApiOperation({
    summary: 'Get all movies',
    description: 'Retrieve a list of all movies',
  })
  @ApiOkResponse({ description: 'List of movies retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiNotFoundResponse({ description: 'Movies not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @ApiOperation({
    summary: 'Get movie by ID',
    description: 'Retrieve a single movie by its ID',
  })
  @ApiOkResponse({ description: 'Movie retrieved successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.movieService.findById(id);
  }

  @ApiOperation({
    summary: 'Create a new movie',
    description: 'Add a new movie to the collection',
  })
  // or @ApiProperty decorators in CreateMovieDto
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       title: { type: 'string' },
  //       description: { type: 'string', nullable: true },
  //       releaseDate: { type: 'string', format: 'date' },
  //       rating: { type: 'number', format: 'float', nullable: true },
  //       genre: {
  //         type: 'string',
  //         enum: Object.values(Genre),
  //       },
  //       isAvailable: { type: 'boolean', nullable: true },
  //       imageUrl: { type: 'string', nullable: true },
  //       actorsIds: { type: 'array', items: { type: 'string', format: 'uuid' } },
  //     },
  //   },
  // })
  @ApiCreatedResponse({
    description: 'Movie created successfully.',
    type: MovieResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateMovieDto) {
    return await this.movieService.create(dto);
  }

  @ApiOperation({
    summary: 'Update a movie',
    description: 'Modify an existing movie in the collection',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', nullable: true },
        description: { type: 'string', nullable: true },
        releaseDate: { type: 'string', format: 'date', nullable: true },
        rating: { type: 'number', format: 'float', nullable: true },
        genre: {
          type: 'string',
          enum: Object.values(Genre),
          nullable: true,
        },
        isAvailable: { type: 'boolean', nullable: true },
        imageUrl: { type: 'string', nullable: true },
        actorsIds: {
          type: 'array',
          items: { type: 'string', format: 'uuid' },
          nullable: true,
        },
      },
    },
  })
  @ApiOkResponse({ description: 'Movie updated successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return await this.movieService.update(id, dto);
  }

  @ApiOperation({
    summary: 'Delete a movie',
    description: 'Remove a movie from the collection',
  })
  @ApiOkResponse({ description: 'Movie deleted successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiNotFoundResponse({ description: 'Movie not found.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
