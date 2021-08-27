import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(@InjectRepository(Product) private productRepository: Repository<Product>,) { }

  async create(createProductDto: CreateProductDto) {
    const createdProduct = await this.productRepository.create(createProductDto)
    const savedProduct = await this.productRepository.save(createdProduct)
    return savedProduct
  }

  async findAll() {
    return await this.productRepository.find()
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id)
    if (!product) {
      throw new NotFoundException(`Product with Id ${id} not found`)
    }
    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = this.findOne(id)
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const product = await this.findOne(id)
    return await this.productRepository.remove(product)
  }
}
