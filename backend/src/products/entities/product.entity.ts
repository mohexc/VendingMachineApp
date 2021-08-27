import { Inventory } from "../../inventories/entities/inventory.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { OrderItem } from "src/order-item/entities/order-item.entity";



inventories: OneToMany
@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    name: string;

    @Column()
    image: string;

    @Column()
    price: string;

    @OneToMany(() => Inventory, inventory => inventory.product)
    inventories: Inventory[]

    @OneToMany(() => OrderItem, order_item => order_item.product)
    order_items: OrderItem[]
}
