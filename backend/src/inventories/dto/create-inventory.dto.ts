import { IsNotEmpty, IsNumber } from "class-validator"

export class CreateInventoryDto {
    @IsNumber()
    @IsNotEmpty()
    productId: number
    @IsNumber()
    @IsNotEmpty()
    shopId: number
    @IsNumber()
    @IsNotEmpty()
    qyt: number
}
