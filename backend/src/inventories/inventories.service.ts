import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { QytDto, UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { ShopsService } from '../shops/shops.service';
import { AlertService } from '../alert/alert.service';

@Injectable()
export class InventoriesService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private productsService: ProductsService,
    private shopsService: ShopsService,
    private alertService: AlertService,
  ) { }

  async create(createInventoryDto: CreateInventoryDto) {
    const product = await this.productsService.findOne(createInventoryDto.productId)
    const shop = await this.shopsService.findOne(createInventoryDto.shopId)
    const inventory = {
      product,
      shop,
      qyt: createInventoryDto.qyt
    }
    const createdInventory = await this.inventoryRepository.create(inventory)
    const savedInventory = await this.inventoryRepository.save(createdInventory)
    return savedInventory
  }

  async findAll() {
    return await this.inventoryRepository.find({
      relations: ['product', 'shop']
    })
  }


  async findOne(id: number) {
    const inventory = await this.inventoryRepository.findOne({
      where: { id },
      relations: ['product', 'shop']
    })
    if (!inventory) {
      throw new NotFoundException(`Inventory with Id ${id} not found`)
    }
    return inventory
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto) {
    const inventory = await this.findOne(id)
    return
  }

  async increaseQyt(id: number, qytDto: QytDto) {
    const inventory = await this.findOne(id)
    inventory.qyt = inventory.qyt + qytDto.qyt
    const savedInventory = await this.inventoryRepository.save(inventory)
    return savedInventory
  }

  async decreaseQyt(id: number, qytDto: QytDto) {
    const inventory = await this.findOne(id)
    inventory.qyt = inventory.qyt - qytDto.qyt
    const savedInventory = await this.inventoryRepository.save(inventory)
    if (savedInventory.qyt < 10) {
      await this.alertService.create(savedInventory)
    }
    return savedInventory
  }

  async remove(id: number) {
    const inventory = await this.findOne(id)
    return await this.inventoryRepository.remove(inventory)
  }
}
