import { Module } from '@nestjs/common';
import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { UsecasesProxyModule } from './infrastructure/usecases-proxy/usecases-proxy.module';

@Module({
  imports: [
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    EnvironmentConfigModule,
  ],
})
export class AppModule {}
