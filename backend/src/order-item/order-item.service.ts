import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersService } from '../orders/orders.service';
import { Repository } from 'typeorm';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { InventoriesService } from '../inventories/inventories.service';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(OrderItem)
    private orderItemRepository: Repository<OrderItem>,
    @Inject(forwardRef(() => OrdersService))
    private ordersService: OrdersService,
    private inventoriesService: InventoriesService
  ) { }

  async create(createOrderItemDto: CreateOrderItemDto) {
    const order = await this.ordersService.findOne(createOrderItemDto.orderId)
    const inventory = await this.inventoriesService.findOne(createOrderItemDto.inventoryId)
    const orderItem = {
      order,
      product: inventory.product,
      qyt: createOrderItemDto.qyt
    }
    const createdOrderItem = await this.orderItemRepository.create(orderItem)
    const savedOrderItem = await this.orderItemRepository.save(createdOrderItem)
    const decreaseQytInventory = await this.inventoriesService.decreaseQyt(inventory.id, { qyt: createOrderItemDto.qyt })
    return savedOrderItem
  }

  async findAll() {
    return await this.orderItemRepository.find()
  }

  async findOne(id: number) {
    const orderItem = await this.orderItemRepository.findOne(id)
    if (!orderItem) {
      throw new NotFoundException(`OrderItem with Id ${id} not found`)
    }
    return orderItem
  }

  async update(id: number, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItem = await this.findOne(id)
    return orderItem
  }

  async remove(id: number) {
    const orderItem = await this.findOne(id)
    return await this.orderItemRepository.remove(orderItem)
  }
}
