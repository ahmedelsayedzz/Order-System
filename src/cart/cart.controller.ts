// cart.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  Put,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('api/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  async addToCart(
    @Body() body: { userId: number; productId: number; quantity: number },
  ) {
    const { userId, productId, quantity } = body;
    return this.cartService.addToCart(userId, productId, quantity);
  }

  @Get(':userId')
  async viewCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cartService.viewCart(userId);
  }
  @Put('update/:userId/:productId')
  async updateCartItem(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
    @Body('quantity', ParseIntPipe) quantity: number,
  ) {
    return this.cartService.updateCart(userId, productId, quantity);
  }
  @Delete('remove/:userId/:productId')
  async removeFromCart(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('productId', ParseIntPipe) productId: number,
  ) {
    try {
      await this.cartService.removeFromCart(userId, productId);
      return { message: 'Product removed from cart successfully' };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
