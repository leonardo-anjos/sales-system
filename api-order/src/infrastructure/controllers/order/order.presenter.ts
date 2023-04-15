import { ApiProperty } from '@nestjs/swagger';
import { OrderModel } from 'src/domain/model/order.model';

export class OrderPresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  customerId: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(order: OrderModel) {
    this.id = order.id;
    this.customerId = order.customerId;
    this.description = order.description;
    this.createdAt = order.createdAt;
    this.updatedAt = order.updatedAt;
  }
}
