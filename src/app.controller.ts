import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { userAgent } from './common/decorators/user-agent.decorator';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('App')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'Get Hello Message',
    description: 'Retrieve a hello message from the application',
  })
  @ApiOkResponse({
    description: 'Hello message retrieved successfully.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized request.' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error.' })
  @Get()
  getHello(@userAgent() userAgent: string): string {
    console.log(`User-Agent: ${userAgent}`);
    return this.appService.getHello();
  }
}
