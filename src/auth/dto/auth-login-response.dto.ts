import { ApiProperty } from '@nestjs/swagger';
import { DataResponseDto } from './data-response.dto';

export class AuthLoginResponse {
  @ApiProperty({ example: 200 })
  statusCode: number;

  @ApiProperty({ type: DataResponseDto })
  data: DataResponseDto;
}
