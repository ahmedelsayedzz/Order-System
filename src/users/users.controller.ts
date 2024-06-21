import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body()
    body: {
      name: string;
      email: string;
      password: string;
      address: string;
    },
  ) {
    return this.usersService.createUser(body);
  }

  @Get(':userId')
  async getUserById(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<User | null> {
    return this.usersService.getUserById(userId);
  }
  @Get(':userId/orders')
  async getOrderHistory(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const orders = await this.usersService.getOrderHistory(userId);
      return orders;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
