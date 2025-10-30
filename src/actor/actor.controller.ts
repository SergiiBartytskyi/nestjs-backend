import { Body, Controller, Post } from '@nestjs/common';
import { ActorService } from './actor.service';
import { CreateActorDto } from './dto/crate-actor.dto';
import {
  ApiBadRequestResponse,
  // ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ActorsResponseDto } from './dto/actor-response.dto';

@ApiTags('Actors')
@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @ApiOperation({
    summary: 'Create a new actor',
    description: 'Add a new actor to the collection',
  })
  // or @ApiProperty decorators in CreateActorDto
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       name: { type: 'string', example: 'Robert Downey Jr.' },
  //     },
  //   },
  // })
  @ApiCreatedResponse({
    description: 'Actor created successfully.',
    type: ActorsResponseDto,
  })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post()
  async create(@Body() dto: CreateActorDto) {
    return this.actorService.create(dto);
  }
}
