import { Body, Controller, Delete, Get, Inject, Post, Put, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { AddOrderUseCases } from 'src/usecases/order/add-order.usecases';
import { DeleteOrderUseCases } from 'src/usecases/order/delete-order.usecases';
import { GetOrderUseCases } from 'src/usecases/order/get-order.usecases';
import { GetOrdersUseCases } from 'src/usecases/order/get-orders.usecases';
import { UpdateOrderUseCases } from 'src/usecases/order/update-order.usecases';
import { OrderPresenter } from './order.presenter';
import { AddOrderDto, UpdateOrderDto } from './order.dto';

@Controller('order')
@ApiTags('order')
@ApiResponse({ status: 500, description: 'Internal error' })
export class OrderController {
  constructor(
    @Inject(UsecasesProxyModule.GET_ORDER_USECASES_PROXY)
    private readonly getOrderUsecaseProxy: UseCaseProxy<GetOrderUseCases>,
    @Inject(UsecasesProxyModule.GET_ORDERS_USECASES_PROXY)
    private readonly getAllOrderUsecaseProxy: UseCaseProxy<GetOrdersUseCases>,
    @Inject(UsecasesProxyModule.PUT_ORDER_USECASES_PROXY)
    private readonly updateOrderUsecaseProxy: UseCaseProxy<UpdateOrderUseCases>,
    @Inject(UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY)
    private readonly deleteOrderUsecaseProxy: UseCaseProxy<DeleteOrderUseCases>,
    @Inject(UsecasesProxyModule.POST_ORDER_USECASES_PROXY)
    private readonly addOrderUsecaseProxy: UseCaseProxy<AddOrderUseCases>,
  ) {}

  @Get('order')
  async getOrder(@Query('id') id: number) {
    const order = await this.getOrderUsecaseProxy.getInstance().execute(id);
    return new OrderPresenter(order);
  }

  @Get('orders')
  async getOrders() {
    const orders = await this.getAllOrderUsecaseProxy.getInstance().execute();
    return orders.map((order) => new OrderPresenter(order));
  }

  @Put('order')
  async updateOrder(@Body() updateOrderDto: UpdateOrderDto) {
    const { id, customerId, description } = updateOrderDto;
    await this.updateOrderUsecaseProxy.getInstance().execute(id, customerId, description);
    return 'success';
  }

  @Delete('order')
  async deleteOrder(@Query('id') id: number) {
    await this.deleteOrderUsecaseProxy.getInstance().execute(id);
    return 'success';
  }

  @Post('order')
  async addOrder(@Body() addOrderDto: AddOrderDto) {
    const { customerId, description } = addOrderDto;
    const orderCreated = await this.addOrderUsecaseProxy.getInstance().execute(customerId, description);
    return new OrderPresenter(orderCreated);
  }
}
