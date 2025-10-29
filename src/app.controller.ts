import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { userAgent } from './common/decorators/user-agent.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(@userAgent() userAgent: string): string {
    console.log(`User-Agent: ${userAgent}`);
    return this.appService.getHello();
  }
}
