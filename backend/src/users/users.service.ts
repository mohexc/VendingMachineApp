import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>,) { }

  async create(createUserDto: CreateUserDto) {
    const createUser = {
      username: createUserDto.username,
      password: createUserDto.password,
      isActive: false,
      role: 'shop'
    }
    const createdUser = await this.usersRepository.create(createUser)
    const { password, ...rest } = await this.usersRepository.save(createdUser)
    return rest
  }

  async findAll() {
    return await this.usersRepository.find()
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException(`Shop with Id ${id} not found`)
    }
    const { password, ...rest } = user
    return rest
  }
  async findOneByUsername(username: string) {
    const user = await this.usersRepository.findOne({ where: { username } })
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`)
    }
    const { password, ...rest } = user
    return rest
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return
  }

  async remove(id: number) {
    const user = await this.usersRepository.findOne(id)
    if (!user) {
      throw new NotFoundException()
    }
    return await this.usersRepository.remove(user)
  }

}
