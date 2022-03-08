import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthLoginDto {
    constructor(){}

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string
    
}
