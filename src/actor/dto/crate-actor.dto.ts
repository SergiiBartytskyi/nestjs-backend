import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActorDto {
  @ApiProperty({
    example: 'Robert Downey Jr.',
    description: 'The name of the actor',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
