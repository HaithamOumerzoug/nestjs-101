import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from 'src/prisma';
import { AuthDto, AuthLoginDto } from '../dtos';

@Injectable()
export class AuthService {

    constructor(
        private prismaService : PrismaService,
        private jwtService    : JwtService,
        private configService : ConfigService
    ){}

    async signUp(authDto : AuthDto){
        try {
            const {email,name,password} = authDto;
        
            const hashed_password = await argon.hash(password);
            const user = await this.prismaService.user.create({
                data:{
                    email,
                    name,
                    password:hashed_password
                },
                // remove hash from user response
                /*select:{
                    name:true,
                    email:true,
                    createdAt:true,
                    updatedAt:true
                }*/
            });
            delete user.password;
            return user;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code = 'P2002')throw new ForbiddenException("Credentials duplicated");
            }
            throw new InternalServerErrorException("Server error");
        }
    }

    async signIn(authDto : AuthLoginDto){
        const {email , password} = authDto;
        const user = await this.prismaService.user.findUnique({
            where:{
                email
            }
        });
        if(!user)throw new ForbiddenException('Credentials incorrect.');
        const isMatches = await argon.verify(user.password,password);
        if(!isMatches)throw  new ForbiddenException('Credentials incorrect.');
        return this.generateToken(user.id);
    }

    async generateToken(
        userId : number
    ):Promise<{token : string}>{
        
        const payload   = {sub:userId}
        const expiresIn = this.configService.get('JWT_EXPIRES_IN');
        const secret    = this.configService.get('JWT_SECRET_KEY');

        const token     = await this.jwtService.signAsync(
            payload,
            {
                expiresIn,
                secret
            }
        );
        return {token}
    }
}
