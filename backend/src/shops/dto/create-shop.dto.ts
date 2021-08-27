import { IsNotEmpty, IsString } from 'class-validator'

export class CreateShopDto {
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsString()
    @IsNotEmpty()
    image: string;
    @IsString()
    @IsNotEmpty()
    address: string;
}
