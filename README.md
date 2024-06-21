# Order Management System (OMS) - Backend Intern Task

This project is an implementation of an Order Management System (OMS) for an e-commerce API. It is built using NestJS as the backend framework, Prisma as the ORM, and PostgreSQL as the database.

## Features

1. **Add to Cart**

   - **Endpoint**: `POST /api/cart/add`
   - **Functionality**: Adds a product to the user's cart or updates the quantity if the product is already in the cart.

2. **View Cart**

   - **Endpoint**: `GET /api/cart/:userId`
   - **Functionality**: Retrieves the user's cart.

3. **Update Cart**

   - **Endpoint**: `PUT /api/cart/update`
   - **Functionality**: Updates the quantity of a product in the cart.

4. **Remove From Cart**

   - **Endpoint**: `DELETE /api/cart/remove`
   - **Functionality**: Removes a product from the cart.

5. **Create Order**

   - **Endpoint**: `POST /api/orders`
   - **Functionality**: Creates a new order for the specified user with the products in their cart.

6. **Get Order by ID**

   - **Endpoint**: `GET /api/orders/:orderId`
   - **Functionality**: Retrieves the order details by order ID.

7. **Update Order Status**

   - **Endpoint**: `PUT /api/orders/:orderId/status`
   - **Functionality**: Updates the status of an order.

8. **Order History Retrieval**

   - **Endpoint**: `GET /api/users/:userId/orders`
   - **Functionality**: Retrieves the order history of a user.

9. **Apply Coupon to Order**
   - **Endpoint**: `POST /api/orders/apply-coupon`
   - **Functionality**: Applies a discount coupon to an order.

## Environment Setup

### Prerequisites

- Node.js
- PostgreSQL
- NestJS CLI
- Prisma CLI

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository_url>
   cd order-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. \*_Set up the database_

   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/database_name"

   ```

4. **Run Prisma migrations**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma client**

   ```bash
   npx prisma generate

   ```

### Running the Application

1. **Start the NestJS server**

   ```bash
   npm run start
   ```

2. **The application will be running at**

   ```bash
   http://localhost:3000
   ```

## URL for published documentation

https://documenter.getpostman.com/view/28843473/2sA3XVAL3o

## Testing the code

### I used Postman to test the endpoints
