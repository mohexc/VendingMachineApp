import { forwardRef, Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderItem } from './entities/order-item.entity';
import { OrdersModule } from '../orders/orders.module';
import { ProductsModule } from '../products/products.module';
import { InventoriesModule } from 'src/inventories/inventories.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    forwardRef(() => OrdersModule),
    ProductsModule,
    InventoriesModule
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService],
  exports: [OrderItemService]
})
export class OrderItemModule { }
