import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrdersDto, UpdateOrdersDto } from './dto';
import { Orders } from './orders.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders) private ordersRepository: Repository<Orders>,
  ) {}

  async getAll(): Promise<Orders[]> {
    return await this.ordersRepository.find();
  }

  async getOneById(id: number): Promise<Orders> {
    try {
      return await this.ordersRepository.findOneOrFail({
        where: { id: id },
      });
    } catch (err) {
      console.log('Get one Orders by id error: ', err.message ?? err);
      throw new HttpException(
        `Orders with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }
  }

  async create(orders: CreateOrdersDto): Promise<Orders> {
    const createdOrders = this.ordersRepository.create(orders);
    return await this.ordersRepository.save(createdOrders);
  }

  async update(id: number, orders: UpdateOrdersDto): Promise<Orders> {
    let foundOrders = await this.ordersRepository.findOneBy({
      id: id,
    });

    if (!foundOrders) {
      throw new HttpException(
        `Orders with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    foundOrders = { ...foundOrders, ...orders, updatedAt: new Date() };
    return await this.ordersRepository.save(foundOrders);
  }

  async delete(id: number): Promise<any> {
    const foundOrders = await this.ordersRepository.findOneBy({
      id: id,
    });

    if (!foundOrders) {
      throw new HttpException(
        `Orders with id ${id} not found.`,
        HttpStatus.NOT_FOUND,
      );
    }

    await this.ordersRepository.delete(id);
  }
}
