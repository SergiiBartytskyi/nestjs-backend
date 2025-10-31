import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './common/middlewares/logger.middleware';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
// import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
// import { AuthGuard } from './common/guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable cookie parser
  app.use(cookieParser());

  // Enable validation globally
  app.useGlobalPipes(new ValidationPipe());

  // // Enable authentication guard globally
  // app.useGlobalGuards(new AuthGuard());

  // Enable response interceptor globally
  app.useGlobalInterceptors(new ResponseInterceptor());

  // Enable exception filter globally
  // app.useGlobalFilters(new AllExceptionsFilter());

  // Set global prefix
  app.setGlobalPrefix('api');

  // Setup Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .setContact(
      'API Support',
      'https://github.com/SergiiBartytskyi/nestjs-backend.git',
      's.bartycjkyj@gmail.com',
    )
    .addBearerAuth()
    .build();

  // Create Swagger document
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    customSiteTitle: 'API Docs',
    jsonDocumentUrl: 'api/docs-json',
    yamlDocumentUrl: 'api/docs-yaml',
  });

  // Use custom logger middleware
  app.use(logger);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
