import { Module } from '@nestjs/common';
import { UserService } from './services';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [UserService],
  exports:[UserService]
})
export class UserModule {}
