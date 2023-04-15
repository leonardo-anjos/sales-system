import { Module } from '@nestjs/common';
import { OrderController } from './order/order.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [OrderController],
})
export class ControllersModule {}
