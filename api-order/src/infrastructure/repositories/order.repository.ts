import { Injectable } from '@nestjs/common';
import { OrderRepository } from './repositories.interface';
import { OrderModel } from 'src/domain/model/order.model';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
  ) {}

  private toOrder(orderEntity: Order): OrderModel {
    const order: OrderModel = new OrderModel();

    order.id = orderEntity.id;
    order.customerId = orderEntity.customerId;
    order.description = orderEntity.description;
    order.createdAt = orderEntity.createdAt;
    order.updatedAt = orderEntity.updatedAt;

    return order;
  }

  private toOrderEntity(order: OrderModel): Order {
    const orderEntity: Order = new Order();

    orderEntity.id = order.id;
    orderEntity.customerId = order.customerId;
    orderEntity.description = order.description;

    return orderEntity;
  }

  async insert(order: OrderModel): Promise<void> {
    const orderEntity = this.toOrderEntity(order);
    await this.orderEntityRepository.insert(orderEntity);
  }

  async findAll(): Promise<OrderModel[]> {
    const orderEntity = await this.orderEntityRepository.find();
    return orderEntity.map((orderEntity) => this.toOrder(orderEntity));
  }

  async findById(id: number): Promise<OrderModel> {
    // const orderEntity = await this.orderEntityRepository.findOneOrFail(id);
    // return this.toOrder(orderEntity);
    return null
  }

  async updateContent(id: number, customerId: number, description: string): Promise<void> {
    // await this.orderEntityRepository.update(
    //   { id: id },
    //   { customerId: customerId },
    //   { description: description },
    // );
  }

  async deleteById(id: number): Promise<void> {
    await this.orderEntityRepository.delete({ id: id });
  }
}
