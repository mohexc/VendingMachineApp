import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Inventory } from '../inventories/entities/inventory.entity';
import { AlertService } from './alert.service';
import { UpdateAlertDto } from './dto/update-alert.dto';

@ApiTags('Alerts')
@Controller('alert')
export class AlertController {
  constructor(private readonly alertService: AlertService) { }

  @Post()
  create(@Body() createAlertDto: Inventory) {
    return this.alertService.create(createAlertDto);
  }

  @Get()
  findAll() {
    return this.alertService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.alertService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAlertDto: UpdateAlertDto) {
    return this.alertService.update(+id, updateAlertDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.alertService.remove(+id);
  }
}
