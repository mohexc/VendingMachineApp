import { IsNotEmpty, IsNumber } from "class-validator";

export class UpdateInventoryDto {

}
export class QytDto {
    @IsNumber()
    @IsNotEmpty()
    qyt: number
}

