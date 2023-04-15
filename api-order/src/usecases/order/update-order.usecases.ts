import { OrderRepository } from 'src/domain/repositories/order.inteface';
import { ILogger } from '../../domain/logger/logger.interface';

export class UpdateOrderUseCases {
  constructor(private readonly logger: ILogger, private readonly orderRepository: OrderRepository) {}

  async execute(id: number, customerId: number): Promise<void> {
    await this.orderRepository.updateContent(id, customerId);
    this.logger.log('UpdateOrderUseCases execute', `Todo ${id} have been updated`);
  }
}
