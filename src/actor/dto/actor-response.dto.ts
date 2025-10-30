import { ApiProperty } from '@nestjs/swagger';

export class ActorsResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the actor',
    example: '550e8400-e29b-41d4-a716-446655440000',
    type: 'string',
  })
  id: string;

  @ApiProperty({
    description: 'The name of the actor',
    example: 'Robert Downey Jr.',
    type: 'string',
  })
  name: string;
}
