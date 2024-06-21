// src/order/order.controller.ts

import {
  Controller,
  Post,
  Body,
  NotFoundException,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { ApplyCouponDto } from './apply-coupon.dto';

@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() body: { userId: number }) {
    const { userId } = body;
    try {
      const order = await this.orderService.createOrder(userId);
      return order;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Get(':orderId')
  async getOrderById(@Param('orderId', ParseIntPipe) orderId: number) {
    try {
      const order = await this.orderService.getOrderById(orderId);
      return order;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Put(':orderId/status')
  async updateOrderStatus(
    @Param('orderId', ParseIntPipe) orderId: number,
    @Body('status') status: string,
  ) {
    try {
      const order = await this.orderService.updateOrderStatus(orderId, status);
      return order;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
  @Post('apply-coupon')
  async applyCoupon(@Body() applyCouponDto: ApplyCouponDto) {
    const { orderId, couponCode } = applyCouponDto;
    try {
      return await this.orderService.applyCoupon(orderId, couponCode);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
