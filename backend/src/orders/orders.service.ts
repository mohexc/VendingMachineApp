import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderItemService } from '../order-item/order-item.service';
import { ShopsService } from '../shops/shops.service';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private shopsService: ShopsService,
    @Inject(forwardRef(() => OrderItemService))
    private orderItemService: OrderItemService
  ) { }

  async create(createOrderDto: CreateOrderDto) {
    const shop = await this.shopsService.findOne(createOrderDto.shopId)
    const order = { shop }
    const createdOrder = await this.orderRepository.create(order)
    const savedOrder = await this.orderRepository.save(createdOrder)

    const orderItems = await Promise.all(createOrderDto.orderItems.map(async (orderItem) => {

      const createOrderItem = await this.orderItemService.create({
        orderId: savedOrder.id,
        inventoryId: orderItem.inventoryId,
        qyt: orderItem.qyt
      })
      return createOrderItem
    }))
    const totolPrice = orderItems.reduce((accumulator, currentValue) => {
      const _totalPrice = parseInt(currentValue.product.price) * currentValue.qyt
      return accumulator + _totalPrice
    }, 0)
    savedOrder.order_items = orderItems
    savedOrder.total_price = totolPrice
    const updateOrder = await this.orderRepository.save(savedOrder)
    return updateOrder
  }

  async findAll() {
    return `This action returns all orders`;
  }

  async findOne(id: number) {
    const order = await this.orderRepository.findOne(id)
    if (!order) {
      throw new NotFoundException(`Order with Id ${id} not found`)
    }
    return order
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    const order = await this.findOne(id)
    return await this.orderRepository.remove(order)
  }
}
