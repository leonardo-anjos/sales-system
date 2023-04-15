import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderModel } from 'src/domain/model/order.model';
import { Order } from '../entities/order.entity';
import { Repository } from 'typeorm';
import { OrderRepository } from 'src/domain/repositories/order.inteface';

@Injectable()
export class DatabaseOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(Order)
    private readonly orderEntityRepository: Repository<Order>,
  ) {}

  private toOrder(orderEntity: Order): OrderModel {
    const order: OrderModel = new OrderModel();

    order.id = orderEntity.id;
    order.customerId = orderEntity.customer_id;
    order.description = orderEntity.description;
    order.createdDate = orderEntity.created_date;
    order.updatedDate = orderEntity.updated_date;

    return order;
  }

  private toOrderEntity(order: OrderModel): Order {
    const orderEntity: Order = new Order();

    orderEntity.id = order.id;
    orderEntity.customer_id = order.customerId;
    orderEntity.description = order.description;

    return orderEntity;
  }

  async insert(order: OrderModel): Promise<OrderModel> {
    const orderEntity = this.toOrderEntity(order);
    const result = await this.orderEntityRepository.insert(orderEntity);
    return this.toOrder(result.generatedMaps[0] as Order);
    console.log(result.generatedMaps);
  }

  async findAll(): Promise<OrderModel[]> {
    const orderEntity = await this.orderEntityRepository.find();
    return orderEntity.map((orderEntity) => this.toOrder(orderEntity));
  }

  async findById(id: number): Promise<OrderModel> {
    const orderEntity = await this.orderEntityRepository.findOneBy({ id: id });
    return this.toOrder(orderEntity);
  }

  async updateContent(id: number, customerId: number): Promise<void> {
    await this.orderEntityRepository.update(
      {
        id: id,
      },
      { customer_id: customerId },
    );
  }

  async deleteById(id: number): Promise<void> {
    await this.orderEntityRepository.delete({ id: id });
  }
}
