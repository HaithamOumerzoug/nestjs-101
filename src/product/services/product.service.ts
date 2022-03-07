import { BadRequestException, HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
        // * Method 1 : 
        /*return this.prismaService.product.findMany({
            where:{userId},
            include:{
                user:true
            }
        }).then((products)=>(products.map(product=>{
                delete product.user.password;
                return product;
            })
        ));*/

        // * Method 2 :
        return await this.prismaService.product.findMany({
            where:{userId},
            include:{
                // ! Eager Loading
                user:{
                    select:{
                        id:true,
                        name:true,
                        createdAt:true,
                        updatedAt:true,
                        email:true
                    }
                }
            },
        })
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

    async deleteProduct(userId : number , productId : number):Promise<{msg:string}>{
        try {
            const product = await this.prismaService.product.findFirst({
                where:{
                    id:productId,
                    userId
                }
            });
            if(!product)throw new HttpException(`User id : ${productId} not found` , HttpStatus.NOT_FOUND);

            await this.prismaService.product.delete({where:{id:productId}});
            return {msg:`Product id ${productId} deleted`};
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2025')throw new HttpException(`Product id : ${productId} not found` , HttpStatus.NOT_FOUND);
                if(error.code == 'P2003')throw new HttpException(`Can't delete the product.`,HttpStatus.FORBIDDEN);
            }
            throw new InternalServerErrorException("Server error");
        }
    }
}