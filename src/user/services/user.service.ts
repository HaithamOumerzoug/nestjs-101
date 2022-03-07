import { HttpException, HttpStatus, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { classToPlain, plainToClass } from 'class-transformer';
import * as argon from 'argon2';

import { AuthDto } from 'src/auth';
import { PrismaService } from 'src/prisma';
import { UserDTO, UserUpdateDto } from '../dtos'

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService : PrismaService
    ){}

    async getCurrentUser(userId :number): Promise<UserDTO>{
        const user = await this.prismaService.user.findUnique({where:{id:userId},include: {products: true,}});
        delete user.password;
        
        const userDto : UserDTO = plainToClass(UserDTO, classToPlain(user));
        return userDto;
    }

    async findUserByEmail(email : string ): Promise<User>{
        return await this.prismaService.user.findUnique({where:{email}});
    }

    async getUserById(id : number): Promise<User>{
        const user = await this.prismaService.user.findUnique({where:{id}});
        delete user.password;
        return user;
    }

    async updateUser(userId : number , userDto: UserUpdateDto):Promise<User>{
        const user = await this.prismaService.user.update({where:{id:userId},data:{...userDto}});
        delete user.password;
        return user;
    }

    async createUser(dto : AuthDto):Promise<User>{
        const {email,name,password} = dto;

        const hashed_password = await argon.hash(password);
        const user = await this.prismaService.user.create({
            data:{
                email,
                name,
                password:hashed_password
            },
        });
        return user;
    }

    async deleteUser(userId : number):Promise<{msg:string}>{
        try {
            const user = await this.prismaService.user.delete({where:{id:userId}});
            return {msg:`User id ${userId} deleted`};
        } catch (error) {
            console.log(error);
    
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code == 'P2025')throw new HttpException(`User id : ${userId} not found` , HttpStatus.NOT_FOUND);
                // Foreinkey exception
                if(error.code == 'P2003')throw new HttpException(`Can't delete the user.`,HttpStatus.FORBIDDEN);
            }
            throw new InternalServerErrorException("Server error");
        }
    }
}
