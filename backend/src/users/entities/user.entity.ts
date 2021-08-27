import { Shop } from '../../shops/entities/shop.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ length: 60 })
    password: string;

    @Column({ default: false })
    isActive: boolean;

    @Column()
    role: string

    @OneToOne(() => Shop, { eager: true })
    @JoinColumn()
    shop: Shop

}