import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from '@prisma/client';
import { GetUser } from 'src/user';
import { ProductDto } from './dtos/product.dto';
import { ProductService } from './services';

/**
 * ? Product controller
 * @author Haitham Oumerzoug
 */
@Controller('products')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
    
    constructor(
        private readonly productService : ProductService
    ) {}

    /**
     ** Get all user products
     * @param id of the current user
     * @returns list of user products
    */
    @Get('all')
    async getALlMyProducts(@GetUser('id') userId: number):Promise<Product[]>{
        return this.productService.getALlMyProducts(userId);
    }

    /**
     **Create new product
     * @param id of the current user and product payload
     * @returns created product
    */
    @Post('create')
    async createProduct(@GetUser('id') userId: number ,@Body() productDto : ProductDto):Promise<Product>{
        return this.productService.createProduct(userId , productDto);
    }

    /**
     **Update product
     * @param id of the product
     * @returns updated product
    */
    @Patch('edit/:productId')
    async updateProduct(@Param('productId' , ParseIntPipe)productId : number , @Body() productDto : ProductDto):Promise<Product>{
        return this.productService.updateProduct(productId , productDto);
    }

    /**
     **Delete product
     * @param id of the product we want to delete
     * @returns confirmation message
    */
    @Delete('delete/:productId')
    async deleteProduct(@GetUser('id') userId , @Param('productId' , ParseIntPipe)productId : number):Promise<{msg:string}>{
        return this.productService.deleteProduct(userId,productId);
    }

}
