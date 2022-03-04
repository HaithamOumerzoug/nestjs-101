import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';
import { GetUser } from './get-user.decorator';

@Controller('users')
export class UserController {
    
    @Get()
    @UseGuards(AuthGuard('jwt'))
    getUser(@GetUser() user : User){
        return {msg:'Hi '+user.name}
    }
}
