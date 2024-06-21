// src/order/order.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, OrderItem, Cart } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(userId: number): Promise<Order> {
    // Fetch the user's cart items
    const cartItems = await this.prisma.cart.findMany({
      where: { userId },
      include: {
        product: true,
      },
    });

    if (cartItems.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    // Create the order
    const order = await this.prisma.order.create({
      data: {
        orderDate: new Date(),
        status: 'Pending',
        userId,
        orderItems: {
          create: cartItems.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    // Clear the user's cart after creating the order
    await this.prisma.cart.deleteMany({
      where: { userId },
    });

    return order;
  }
  async getOrderById(orderId: number): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { orderId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }
  async updateOrderStatus(orderId: number, status: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return this.prisma.order.update({
      where: { orderId },
      data: { status },
    });
  }

  private coupons = [
    { code: 'SUMMER2024', discount: 10.0 },
    { code: 'WINTER2024', discount: 15.0 },
  ];

  async applyCoupon(orderId: number, couponCode: string): Promise<Order> {
    const order = await this.prisma.order.findUnique({
      where: { orderId },
      include: { orderItems: { include: { product: true } } },
    });

    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    const coupon = this.coupons.find((c) => c.code === couponCode);

    if (!coupon) {
      throw new NotFoundException(`Coupon with code ${couponCode} not found`);
    }

    const originalTotal = order.orderItems.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    const newTotal = originalTotal - coupon.discount;

    // Assuming there's a field in the order to store the new total
    return this.prisma.order.update({
      where: { orderId },
      data: {
        status: `Discount applied: ${coupon.discount}`, // Update the status field to indicate the discount
      },
    });
  }
}
