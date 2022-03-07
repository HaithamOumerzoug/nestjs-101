import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDTO , UserUpdateDto } from './dtos';
import { GetUser } from './decorators/get-user.decorator';
import { UserService } from './services';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    
    constructor(
        private readonly userService : UserService
    ) {}

    @Get('me')
    getUser(@GetUser('id') userId : number):Promise<UserDTO>{
        return this.userService.getCurrentUser(userId);
    }

    @Patch('edit')
    editUser(@GetUser('id') userId : number , @Body() userDto : UserUpdateDto):Promise<User>{
        return this.userService.updateUser(userId , userDto);
    }

    @Delete('deleteAccount')
    deleteUser(@GetUser('id') userId:number):Promise<any>{
        return this.userService.deleteUser(userId);
    }
}
