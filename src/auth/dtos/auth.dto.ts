import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class AuthDto {
    constructor(){}

    @IsEmail()
    @IsNotEmpty()
    email : string

    @IsString()
    @IsNotEmpty()
    password : string

    @IsString()
    name : string


    get getEmail():string {
        return this.email;
    }

    get getName():string {
        return this.name;
    }

    get getPassword():string{
        return this.password;
    }
}
