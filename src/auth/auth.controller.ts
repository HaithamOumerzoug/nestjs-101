import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dtos';

@Controller('auth')
export class AuthController {
    constructor(
        private authService : AuthService,
    ){}

    @Post('signIn')
    async signIn(@Body() authDto : AuthLoginDto):Promise<any>{
        return this.authService.signIn(authDto);
    }

    @Post('signUp')
    async signUp(@Body() authDto : AuthDto) {        
        return this.authService.signUp(authDto);
    }
}
