import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { Product } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma';
import { ProductDto } from '../dtos/product.dto';

@Injectable()
export class ProductService {
    constructor(
        private readonly prismaService : PrismaService
    ) {}

    async getALlMyProducts(userId : number):Promise<Product[]>{
        return this.prismaService.product.findMany({
            where:{userId},
            include:{
                user:true
            }
        }).then((products)=>(products.map(product=>{
                delete product.user.password;
                return product;
            })
        ));
    }

    async createProduct(userId : number , productDto : ProductDto):Promise<Product>{
        try {
            const user = await this.prismaService.user.findUnique({where:{id:userId}});
            if(!user)throw new BadRequestException('Credentials incorrect.');
            const {name , price} = productDto;
            const product = await this.prismaService.product.create({
                data:{
                    name,
                    price,
                    userId,
                }
            });
            return product;
        } catch (error) {
            console.log(error);
            
            throw new InternalServerErrorException("Server error");
        }
    }

    async updateProduct(productId: number, productDto: ProductDto):Promise<Product>{
        try {
            console.log(typeof(productId));
            
            const product = await this.prismaService.product.update({where:{id:productId},data:{...productDto}});
            return product;
        } catch (error) {
            console.log(error);
            
            if(error instanceof PrismaClientKnownRequestError ){
                if(error.code == 'P2025')throw new NotFoundException(`No product found with id : ${productId}.`);
            }
            else throw new InternalServerErrorException('Server error');
        }
    }
}