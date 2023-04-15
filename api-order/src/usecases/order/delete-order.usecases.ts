import { ILogger } from 'src/domain/logger/logger.interface';
import { OrderRepository } from 'src/domain/repositories/order.inteface';

export class DeleteOrderUseCases {
  constructor(private readonly logger: ILogger, private readonly orderRepository: OrderRepository ) {}

  async execute(id: number): Promise<void> {
    await this.orderRepository.deleteById(id);
    this.logger.log('DeleteOrderUseCases execute', `Todo ${id} have been deleted` );
  }
}
