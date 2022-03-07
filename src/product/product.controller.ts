import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from '@prisma/client';
import { IsNumber } from 'class-validator';
import { GetUser } from 'src/user';
import { ProductDto } from './dtos/product.dto';
import { ProductService } from './services';

@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
    
    constructor(
        private readonly productService : ProductService
    ) {}

    @Get('all')
    async getALlMyProducts(@GetUser('id') userId: number):Promise<Product[]>{
        return this.productService.getALlMyProducts(userId);
    }

    @Post('create')
    async createProduct(@GetUser('id') userId: number ,@Body() productDto : ProductDto):Promise<Product>{
        return this.productService.createProduct(userId , productDto);
    }

    @Patch('edit/:productId')
    async updateProduct(@Param('productId' , ParseIntPipe)productId : number , @Body() productDto : ProductDto):Promise<Product>{
        return this.productService.updateProduct(productId , productDto);
    }

    @Delete('delete/:productId')
    async deleteProduct(@GetUser('id') userId , @Param('productId' , ParseIntPipe)productId : number):Promise<{msg:string}>{
        return this.productService.deleteProduct(userId,productId);
    }

}
