import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async addToCart(
    userId: number,
    productId: number,
    quantity: number,
  ): Promise<Cart> {
    try {
      const existingCartItem = await this.prisma.cart.findFirst({
        where: { userId, productId },
      });

      if (existingCartItem) {
        return this.prisma.cart.update({
          where: { id: existingCartItem.id }, // Use the correct unique identifier field
          data: { quantity: { increment: quantity } },
        });
      } else {
        return this.prisma.cart.create({
          data: { userId, productId, quantity },
        });
      }
    } catch (error) {
      throw new Error(`Unable to add to cart: ${error.message}`);
    }
  }
  async viewCart(userId: number) {
    return this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: true, // Include product details in the cart items
      },
    });
  }
  async updateCart(userId: number, productId: number, quantity: number) {
    const existingCartItem = await this.prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!existingCartItem) {
      throw new Error(
        `Cart item not found for userId: ${userId} and productId: ${productId}`,
      );
    }

    return this.prisma.cart.update({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
      data: {
        quantity: {
          set: quantity,
        },
      },
    });
  }
  async removeFromCart(userId: number, productId: number) {
    const cartItem = await this.prisma.cart.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!cartItem) {
      throw new Error(
        `Cart item not found for userId: ${userId} and productId: ${productId}`,
      );
    }

    return this.prisma.cart.delete({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });
  }
}
