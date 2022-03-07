import { ForbiddenException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { classToPlain, plainToClass } from 'class-transformer';

import { AuthDto, AuthLoginDto } from '../dtos';
import { UserDTO, UserService } from 'src/user';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService    : JwtService,
        private readonly configService : ConfigService,
        private readonly userService   : UserService
    ){}

    async signUp(authDto : AuthDto){
        try {
            const user = await this.userService.createUser(authDto);
            delete user.password;
            const userDto : UserDTO = plainToClass(UserDTO, classToPlain(user));
            return userDto;
        } catch (error) {
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code = 'P2002')throw new ForbiddenException("Credentials duplicated.");
            }
            throw new InternalServerErrorException("Server error");
        }
    }

    async signIn(authDto : AuthLoginDto){
        const {email , password} = authDto;
        const user = await this.userService.findUserByEmail(email);
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
