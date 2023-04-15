import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateOrderDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly customerId: number;
}

export class AddOrderDto {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  readonly description: string;
}
