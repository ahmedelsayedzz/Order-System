import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { PrismaModule } from '../prisma/prisma.module'; // Adjust the path as per your project structure

@Module({
  imports: [PrismaModule], // Import PrismaModule here
  providers: [CartService],
})
export class CartModule {}
