import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert a sample product
  await prisma.product.create({
    data: {
      name: 'Sample Product 2',
      description: 'A sample product for testing 2',
      price: 100.01,
      stock: 502,
    },
  });

  console.log('Sample product created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
