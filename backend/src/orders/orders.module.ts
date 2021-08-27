import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItemModule } from '../order-item/order-item.module';
import { ShopsModule } from 'src/shops/shops.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    forwardRef(() => OrderItemModule),
    ShopsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule { }
