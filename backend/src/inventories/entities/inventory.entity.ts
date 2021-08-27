import { Product } from "src/products/entities/product.entity";
import { Shop } from "src/shops/entities/shop.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class Inventory {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    qyt: number;

    @ManyToOne(() => Shop, shop => shop.inventories,)
    shop: Shop;

    @ManyToOne(() => Product, product => product.inventories,)
    product: Product;

}
