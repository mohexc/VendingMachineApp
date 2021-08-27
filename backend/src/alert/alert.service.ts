import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlertDto } from './dto/create-alert.dto';
import { UpdateAlertDto } from './dto/update-alert.dto';
import { Alert } from './entities/alert.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';

@Injectable()
export class AlertService {
  constructor(
    @InjectRepository(Alert)
    private alertRepository: Repository<Alert>,
  ) { }

  async create(createAlertDto: Inventory) {
    const createdAlert = await this.alertRepository.create({
      shop: createAlertDto.shop,
      title: `Product ${createAlertDto.product.name} quantity is less than 10`,
      description: `
    Machine : ${createAlertDto.shop.name}
    Product ${createAlertDto.product.name} quantity is ${createAlertDto.qyt}
    `
    })
    const savedAlert = await this.alertRepository.save(createdAlert)
    return savedAlert
  }

  async findAll() {
    return await this.alertRepository.find()
  }

  async findOne(id: number) {
    const alert = this.alertRepository.findOne(id)
    if (!alert) {
      throw new NotFoundException(`Alert with Id ${id} not found`)
    }
    return alert
  }

  async update(id: number, updateAlertDto: UpdateAlertDto) {
    const alert = await this.findOne(id)
    return alert
  }

  async remove(id: number) {
    const alert = await this.findOne(id)
    return await this.alertRepository.remove(alert)
  }
}
