import { OrderModel } from 'src/domain/model/order.model';
import { OrderRepository } from 'src/domain/repositories/order.inteface';

export class GetOrdersUseCases {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(): Promise<OrderModel[]> {
    return await this.orderRepository.findAll();
  }
}
