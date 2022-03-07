import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services';

//Be global for all app modules
@Global()
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
