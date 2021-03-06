import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateShopDto } from './dto/create-shop.dto';
import { UpdateShopDto } from './dto/update-shop.dto';
import { Shop } from './entities/shop.entity';

@Injectable()
export class ShopsService {
  constructor(@InjectRepository(Shop) private shopRepository: Repository<Shop>,) { }

  async create(createShopDto: CreateShopDto) {
    const createdShop = await this.shopRepository.create(createShopDto)
    const savedShop = await this.shopRepository.save(createdShop)
    return savedShop
  }

  async findAll() {
    return await this.shopRepository.find()
  }

  async findOne(id: number) {
    const shop = await this.shopRepository.findOne(id)
    if (!shop) {
      throw new NotFoundException(`Shop with Id ${id} not found`)
    }
    return shop
  }

  async findOneAndInventories(id: number) {
    await this.findOne(id)
    const shopInventory = await this.shopRepository.findOne({
      where: { id },
      relations: ["inventories", 'inventories.product'],
    })
    return shopInventory
  }

  async findOneAndOrder(id: number) {
    await this.findOne(id)
    const shopOrders = await this.shopRepository.find({
      where: { id },
      relations: ["orders", "orders.order_items", "orders.order_items.product"]
    })
    return shopOrders
  }

  async findOneAndAlert(id: number) {
    await this.findOne(id)
    const shopAlerts = await this.shopRepository.find({
      where: { id },
      relations: ["alerts"]
    })
    return shopAlerts
  }

  async update(id: number, updateShopDto: UpdateShopDto) {
    const shop = await this.findOne(id)
    return
  }

  async remove(id: number) {
    const shop = await this.findOne(id)
    return await this.shopRepository.remove(shop)
  }
}
