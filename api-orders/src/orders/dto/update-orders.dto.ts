import { PartialType } from '@nestjs/swagger';
import { CreateOrdersDto } from './index';

export class UpdateOrdersDto extends PartialType(CreateOrdersDto) {}
