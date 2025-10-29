import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
// import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // // Enable authentication guard globally
  // app.useGlobalGuards(new AuthGuard());

  // Enable response interceptor globally
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable exception filter globally
  app.useGlobalFilters(new AllExceptionsFilter());

  // Set global prefix
  app.setGlobalPrefix('api');

  // Use custom logger middleware
  app.use(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
