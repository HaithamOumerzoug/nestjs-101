import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth';
import { PrismaModule } from './prisma';
import { UserModule } from './user';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal:true
    }),
    UserModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
