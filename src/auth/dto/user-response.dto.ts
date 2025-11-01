import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: '8166441e-3e75-4025-a0da-99d7f0385e08' })
  id: string;

  @ApiProperty({ example: 'example@mail.com' })
  email: string;

  @ApiProperty({ example: 'Bobba Fett' })
  name: string;
}
