import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShopsModule } from './shops/shops.module';
import { InventoriesModule } from './inventories/inventories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OrderItemModule } from './order-item/order-item.module';
import { AlertModule } from './alert/alert.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      migrationsTableName: "custom_migration_table",
      migrations: ["migration/*.js"],
      cli: { "migrationsDir": "migration" }
    }),
    UsersModule,
    ShopsModule,
    InventoriesModule,
    ProductsModule,
    OrdersModule,
    OrderItemModule,
    AlertModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
