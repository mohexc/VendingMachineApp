import { User } from '../../users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Inventory } from '../../inventories/entities/inventory.entity';
import { Order } from '../../orders/entities/order.entity';
import { Alert } from '../../alert/entities/alert.entity';

@Entity()
export class Shop {
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
    address: string;

    @Column({ default: false })
    isOpen: boolean;

    @OneToMany(() => Inventory, inventory => inventory.shop,)
    @JoinColumn()
    inventories: Inventory[];

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

    @OneToMany(() => Order, order => order.shop,)
    @JoinColumn()
    orders: Order[];

    @OneToMany(() => Alert, alert => alert.shop,)
    @JoinColumn()
    alert: Alert[];
}
