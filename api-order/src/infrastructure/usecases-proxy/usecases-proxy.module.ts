import { DynamicModule, Module } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { UseCaseProxy } from './usecases-proxy';
import { DatabaseOrderRepository } from '../repositories/order.repository';
import { GetOrderUseCases } from 'src/usecases/order/get-order.usecases';
import { GetOrdersUseCases } from 'src/usecases/order/get-orders.usecases';
import { AddOrderUseCases } from 'src/usecases/order/add-order.usecases';
import { UpdateOrderUseCases } from 'src/usecases/order/update-order.usecases';
import { DeleteOrderUseCases } from 'src/usecases/order/delete-order.usecases';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static GET_ORDER_USECASES_PROXY = 'getTodoUsecasesProxy';
  static GET_ORDERS_USECASES_PROXY = 'getTodosUsecasesProxy';
  static POST_ORDER_USECASES_PROXY = 'postTodoUsecasesProxy';
  static DELETE_ORDER_USECASES_PROXY = 'deleteTodoUsecasesProxy';
  static PUT_ORDER_USECASES_PROXY = 'putTodoUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [DatabaseOrderRepository],
          provide: UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
          useFactory: (orderRepository: DatabaseOrderRepository) => new UseCaseProxy(new GetOrderUseCases(orderRepository)),
        },
        {
          inject: [DatabaseOrderRepository],
          provide: UsecasesProxyModule.GET_ORDERS_USECASES_PROXY,
          useFactory: (orderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new GetOrdersUseCases(orderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.POST_ORDER_USECASES_PROXY,
          useFactory: (logger: LoggerService, orderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new AddOrderUseCases(logger, orderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.PUT_ORDER_USECASES_PROXY,
          useFactory: (logger: LoggerService, orderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new UpdateOrderUseCases(logger, orderRepository)),
        },
        {
          inject: [LoggerService, DatabaseOrderRepository],
          provide: UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY,
          useFactory: (logger: LoggerService, orderRepository: DatabaseOrderRepository) =>
            new UseCaseProxy(new DeleteOrderUseCases(logger, orderRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_ORDER_USECASES_PROXY,
        UsecasesProxyModule.GET_ORDERS_USECASES_PROXY,
        UsecasesProxyModule.POST_ORDER_USECASES_PROXY,
        UsecasesProxyModule.PUT_ORDER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_ORDER_USECASES_PROXY,
      ],
    };
  }
}
