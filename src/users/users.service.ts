import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, User } from '@prisma/client';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: {
    name: string;
    email: string;
    password: string;
    address: string;
  }): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async getUserById(userId: number): Promise<User> {
    return this.prisma.user.findUnique({
      where: { userId },
    });
  }
  async getOrderHistory(userId: number): Promise<Order[]> {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      include: {
        Order: {
          include: {
            orderItems: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return user.Order;
  }
}
