import { Body, Controller, Post } from '@nestjs/common';
import { UserDTO } from 'src/user';

import { AuthDto, AuthLoginDto } from './dtos';
import { AuthService } from './services';

/**
 * ? Authentification controller
 * @author Haitham Oumerzoug
 */
@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
    ){}

    /**
     **Sign In
     * @param user authentification payload
     * @returns user token
    */
    @Post('signIn')
    async signIn(@Body() authDto : AuthLoginDto):Promise<{token:string}>{
        return this.authService.signIn(authDto);
    }

    /**
     **Create user
     * @param data for the new user
     * @returns created user
    */
    @Post('signUp')
    async signUp(@Body() authDto : AuthDto):Promise<UserDTO> {        
        return this.authService.signUp(authDto);
    }
}
