import { Module } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { InventoriesController } from './inventories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { ProductsModule } from '../products/products.module';
import { ShopsModule } from '../shops/shops.module';
import { AlertModule } from '../alert/alert.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Inventory]),
    ProductsModule,
    ShopsModule,
    AlertModule
  ],
  controllers: [InventoriesController],
  providers: [InventoriesService],
  exports: [InventoriesService]
})
export class InventoriesModule { }
