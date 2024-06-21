import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CartModule } from './cart/cart.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { PrismaModule } from './prisma/prisma.module';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';
import { OrderController } from './order/order.controller';

@Module({
  imports: [UsersModule, CartModule, PrismaModule, OrderModule],
  controllers: [AppController, CartController, OrderController],
  providers: [AppService, CartService, OrderService],
})
export class AppModule {}
