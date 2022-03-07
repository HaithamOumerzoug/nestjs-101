import { Module } from '@nestjs/common';
import { ProductService } from './services';
import { ProductController } from './product.controller';

@Module({
  providers: [ProductService],
  controllers: [ProductController]
})
export class ProductModule {}
