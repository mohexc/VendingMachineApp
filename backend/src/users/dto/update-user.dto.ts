import { Shop } from "../../shops/entities/shop.entity";

export class UpdateUserDto {
    username: string;
    password: string;
    isActive: boolean;
    role: string
    shop: Shop
}
