import { Shop } from "../../shops/entities/shop.entity";

export class CreateAlertDto {
    title: string;
    description: string;
    shopId: number
}
