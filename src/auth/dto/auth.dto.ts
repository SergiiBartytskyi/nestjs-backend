import { ApiProperty } from '@nestjs/swagger';
import { DataResponseDto } from './data-response.dto';

export class AuthResponse {
  @ApiProperty({ example: 201 })
  statusCode: number;

  @ApiProperty({ type: DataResponseDto })
  data: DataResponseDto;
}
