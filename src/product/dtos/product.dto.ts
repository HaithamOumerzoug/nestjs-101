import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class ProductDto{

    @IsNotEmpty()
    @IsString()
    name : string;

    @IsNumber()
    @IsPositive()
    @IsNotEmpty()
    price : number;
}