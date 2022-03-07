import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserDTO } from './dtos';
import { GetUser } from './decorators/get-user.decorator';
import { UserService } from './services';

@Controller('users')
export class UserController {
    
    constructor(
        private readonly userService : UserService
    ) {
        
    }

    @Get('/me')
    @UseGuards(AuthGuard('jwt'))
    getUser(@GetUser('id') userId : number):Promise<UserDTO>{
        return this.userService.getCurrentUser(userId);
    }
}
