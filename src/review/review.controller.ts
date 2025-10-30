import { Body, Controller, Post } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import {
  ApiBadRequestResponse,
  // ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({
    summary: 'Create a new review',
    description: 'Add a new review to the collection',
  })
  // or @ApiProperty decorators in CreateReviewDto
  // @ApiBody({
  //   schema: {
  //     type: 'object',
  //     properties: {
  //       movieId: { type: 'string', example: 'movie123' },
  //       rating: { type: 'number', example: 4.5 },
  //       comment: { type: 'string', example: 'Great movie!' },
  //     },
  //   },
  // })
  @ApiCreatedResponse({ description: 'Review created successfully.' })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Post()
  async create(@Body() dto: CreateReviewDto) {
    return await this.reviewService.create(dto);
  }
}
