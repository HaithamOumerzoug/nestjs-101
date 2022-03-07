import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserService } from 'src/user';

import { AuthController } from './auth.controller';
import { AuthService } from './services';
import { JwtStrategy } from './strategy';

@Module({
  imports:[
    JwtModule.register({}),
  ],
  providers: [
    AuthService ,
    UserService, 
    JwtStrategy
  ],
  controllers: [AuthController]
})
export class AuthModule {}
