import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../entities/order.entity';
import { DatabaseOrderRepository } from './order.repository';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Order])],
  providers: [DatabaseOrderRepository],
  exports: [DatabaseOrderRepository],
})
export class RepositoriesModule {}
