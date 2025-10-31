import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginRequest {
  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    type: 'string',
  })
  @IsString()
  @IsNotEmpty({ message: 'Email must not be empty' })
  @IsEmail({}, { message: 'Email must be a valid email address' })
  email: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'The password for the user account',
    type: 'string',
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password must not be empty' })
  @Length(6, 32, {
    message: 'Password must be between 6 and 32 characters long',
  })
  password: string;
}
