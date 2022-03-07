import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDTO , UserUpdateDto } from './dtos';
import { GetUser } from './decorators/get-user.decorator';
import { UserService } from './services';
import { User } from '@prisma/client';

/**
 * ? User controller
 * @author Haitham Oumerzoug
 */
@UseGuards(AuthGuard('jwt'))
@Controller('users')
export class UserController {
    
    constructor(
        private readonly userService : UserService
    ) {}

    /**
     **Get current user info
     * @param id of the current user
     * @returns user data
    */
    @Get('me')
    getUser(@GetUser('id') userId : number):Promise<UserDTO>{
        return this.userService.getCurrentUser(userId);
    }

    /**
     **Update user profile
     * @param id of the user and new user payload
     * @returns updated user
    */
    @Patch('edit')
    editUser(@GetUser('id') userId : number , @Body() userDto : UserUpdateDto):Promise<User>{
        return this.userService.updateUser(userId , userDto);
    }

    /**
     **Delete user
     * @param id of the user that we want to delete
     * @returns confirmation message
    */
    @Delete('deleteAccount')
    deleteUser(@GetUser('id') userId:number):Promise<{msg:string}>{
        return this.userService.deleteUser(userId);
    }
}
