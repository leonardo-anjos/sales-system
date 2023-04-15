import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeormModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { RepositoriesModule } from './domain/repositories/repositories.module';
import { UsecasesProxyModule } from './usecases/usecases-proxy/usecases-proxy.module';
import { GetOrdersUsecasesService } from './usecases/get-orders-usecases/get-orders-usecases.service';
import { ControllersController } from './infrastructure/controllers/controllers.controller';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    TypeormModule,
    LoggerModule,
    ExceptionsModule,
    RepositoriesModule,
    UsecasesProxyModule,
    ControllersModule,
  ],
  providers: [GetOrdersUsecasesService],
  controllers: [ControllersController],
})
export class AppModule {}
