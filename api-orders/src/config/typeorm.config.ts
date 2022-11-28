import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const port: number = parseInt(<string>process.env.PORT);

export const typeormConnectionConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.MYSQL_HOST || 'localhost',
  port: port || 3306,
  username: process.env.MYSQL_USER || 'orders',
  password: process.env.MYSQL_PASSWORD || 'orders',
  database: process.env.MYSQL_DATABASE || 'orders',
  entities: ['dist/**/*.entity{.ts,.js}'],
  synchronize: true,
  timezone: 'utc',
};
