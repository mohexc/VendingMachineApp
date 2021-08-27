import { IsInt, IsNotEmpty } from "class-validator"

export class CreateOrderItemDto {
    @IsInt()
    @IsNotEmpty()
    inventoryId: number
    @IsInt()
    @IsNotEmpty()
    orderId: number
    @IsInt()
    @IsNotEmpty()
    qyt: number
}
