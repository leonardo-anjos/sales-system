import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateOrdersDto, UpdateOrdersDto } from './dto/index';
import { Orders } from './orders.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get()
  async GetAll(): Promise<Orders[]> {
    return this.ordersService.getAll();
  }

  @Get(':id')
  async GetOne(@Param('id', ParseIntPipe) id: number): Promise<Orders> {
    return this.ordersService.getOneById(id);
  }

  @Post()
  async create(@Body() orders: CreateOrdersDto): Promise<Orders> {
    return this.ordersService.create(orders);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() orders: UpdateOrdersDto,
  ): Promise<Orders> {
    return this.ordersService.update(id, orders);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return this.ordersService.delete(id);
  }
}
