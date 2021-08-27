import { OrderItem } from "../../order-item/entities/order-item.entity";
import { Shop } from "../../shops/entities/shop.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(() => Shop, shop => shop.orders, { cascade: true })
    shop: Shop

    @OneToMany(() => OrderItem, order_item => order_item.order, { cascade: true })
    order_items: OrderItem[]

    @Column({ default: 0 })
    total_price: number
}
