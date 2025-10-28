import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async findAll() {
    return await this.movieService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.movieService.findById(id);
  }

  @Post()
  async create(@Body() dto: CreateMovieDto) {
    return await this.movieService.create(dto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateMovieDto) {
    return await this.movieService.update(id, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.movieService.delete(id);
  }
}
