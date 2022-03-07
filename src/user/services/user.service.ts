import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { classToPlain, plainToClass } from 'class-transformer';

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
}
