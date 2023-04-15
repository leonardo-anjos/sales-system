import { OrderModel } from 'src/domain/model/order.model';

export interface OrderRepository {
  insert(order: OrderModel): Promise<void>;
  findAll(): Promise<OrderModel[]>;
  findById(id: number): Promise<OrderModel>;
  updateContent(
    id: number,
    customerId: number,
    description: string,
  ): Promise<void>;
  deleteById(id: number): Promise<void>;
}
