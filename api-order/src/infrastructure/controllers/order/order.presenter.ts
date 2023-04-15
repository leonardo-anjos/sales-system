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
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(order: OrderModel) {
    this.id = order.id;
    this.customerId = order.customerId;
    this.description = order.description;
    this.createdate = order.createdDate;
    this.updateddate = order.updatedDate;
  }
}
