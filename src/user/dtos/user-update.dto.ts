import { IsOptional, IsString } from "class-validator"

export class UserUpdateDto{

    @IsOptional()
    @IsString()
    name      : string

    @IsOptional()
    @IsString()
    email     : string
}