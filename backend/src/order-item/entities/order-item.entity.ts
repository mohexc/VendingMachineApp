import { Order } from "../../orders/entities/order.entity";
import { Product } from "../../products/entities/product.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    qyt: number

    @ManyToOne(() => Order, order => order.order_items)
    order: Order;

    @ManyToOne(() => Product, product => product.order_items)
    product: Product
}
