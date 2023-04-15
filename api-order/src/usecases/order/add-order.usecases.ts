import { OrderRepository } from 'src/domain/repositories/order.inteface';
import { ILogger } from '../../domain/logger/logger.interface';
import { OrderModel } from 'src/domain/model/order.model';

export class AddOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(description: string): Promise<OrderModel> {
    const order = new OrderModel();
    order.description = description;

    const result = await this.orderRepository.insert(order);
    this.logger.log('AddOrderUseCases execute', 'New order have been inserted');
    return result;
  }
}
