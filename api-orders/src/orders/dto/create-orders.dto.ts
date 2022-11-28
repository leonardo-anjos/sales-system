import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateOrdersDto {
  @IsNotEmpty()
  @IsNumber()
  @Max(9999999999)
  @Min(0)
  @ApiProperty()
  customerId: number;

  @IsString({ message: 'description must be a text' })
  @ApiProperty()
  @IsOptional()
  description: string;
}
