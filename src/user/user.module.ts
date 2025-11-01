import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PassportModule, AuthModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
