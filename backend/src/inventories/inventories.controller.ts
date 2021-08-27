import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { InventoriesService } from './inventories.service';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { QytDto, UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Inventories')
@Controller('inventories')
export class InventoriesController {
  constructor(private readonly inventoriesService: InventoriesService) { }

  @Post()
  create(@Body() createInventoryDto: CreateInventoryDto) {
    return this.inventoriesService.create(createInventoryDto);
  }

  @Get()
  findAll() {
    return this.inventoriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.inventoriesService.findOne(+id);
  }

  @Patch(':id/increase-qyt')
  increaseQyt(@Param('id') id: string, @Body() qytDto: QytDto) {
    return this.inventoriesService.increaseQyt(+id, qytDto);
  }

  @Patch(':id/decrease-qyt')
  decreaseQyt(@Param('id') id: string, @Body() qytDto: QytDto) {
    return this.inventoriesService.decreaseQyt(+id, qytDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInventoryDto: UpdateInventoryDto) {
    return this.inventoriesService.update(+id, updateInventoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.inventoriesService.remove(+id);
  }
}
