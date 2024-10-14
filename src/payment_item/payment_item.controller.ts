import { CreatePaymentItemDto } from './dto/create_payment_item.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PaymentItemService } from './payment_item.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import toResponse from 'src/helpers/response';
import { UpdatePaymentItemDto } from './dto/updtae_payment_item.dto';

@Controller('payment-item')
export class PaymentItemController {
  constructor(private paymentItemService: PaymentItemService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() CreatePaymentItemDto: CreatePaymentItemDto) {
    return toResponse(
      'payment item successfully created',
      await this.paymentItemService.create(CreatePaymentItemDto),
    );
  }

  @Put('/:id')
  @UseGuards(JwtGuard)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaymentItemDto: UpdatePaymentItemDto,
  ) {
    return toResponse(
      'payment item successfully updated',
      await this.paymentItemService.update(id, updatePaymentItemDto),
    );
  }

  @Delete('/:id')
  @UseGuards(JwtGuard)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.paymentItemService.delete(id);
    return toResponse('payment item successfully deleted');
  }

  @Get('/:id')
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return toResponse(
      'get single payment item successfully',
      await this.paymentItemService.getOne(id),
    );
  }

  @Get()
  async getAll() {
    return toResponse(
      'get all payment items successfully',
      await this.paymentItemService.getAll(),
    );
  }
}
