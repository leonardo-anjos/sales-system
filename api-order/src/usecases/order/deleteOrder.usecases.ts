import { ILogger } from 'src/domain/logger/logger.interface';
import { OrderRepository } from 'src/domain/repositories/order.repository';

export class deleteOrderUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly orderRepository: OrderRepository,
  ) {}

  async execute(id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
    this.logger.log(
      'deleteOrderUseCases execute',
      `Todo ${id} have been deleted`,
    );
  }
}
