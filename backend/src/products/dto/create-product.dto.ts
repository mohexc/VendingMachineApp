import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    image: string;
    @IsInt()
    @IsNotEmpty()
    price: string;
}
