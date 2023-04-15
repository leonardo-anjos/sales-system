import { OrderRepository } from 'src/domain/repositories/order.repository';
import { ILogger } from '../../domain/logger/logger.interface';

export class UpdateOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(
    id: number,
    customerId: number,
    description: string,
  ): Promise<void> {
    await this.orderRepository.updateContent(id, customerId, description);
    this.logger.log(
      'updateOrderUseCases execute',
      `Todo ${id} have been updated`,
    );
  }
}
