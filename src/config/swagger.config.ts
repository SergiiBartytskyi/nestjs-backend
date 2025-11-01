import { DocumentBuilder } from '@nestjs/swagger';

export function getSwaggerConfig() {
  // Setup Swagger documentation
  return new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .setContact(
      'API Support',
      'https://github.com/SergiiBartytskyi/nestjs-backend.git',
      's.bartycjkyj@gmail.com',
    )
    .addBearerAuth()
    .build();
}
