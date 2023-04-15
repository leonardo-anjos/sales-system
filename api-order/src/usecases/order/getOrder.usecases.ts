import { OrderModel } from 'src/domain/model/order.model';
import { OrderRepository } from 'src/domain/repositories/order.repository';

export class getOrderUseCases {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(id: number): Promise<OrderModel> {
    return await this.orderRepository.findById(id);
  }
}
