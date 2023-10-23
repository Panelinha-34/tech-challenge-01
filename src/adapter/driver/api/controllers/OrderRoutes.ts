import { FastifyInstance } from "fastify";

import { PrismaOrderRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaOrderRepository";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";

import { OrderController } from "./OrderController";
import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";
import { CreateOrderControllerMapper } from "./mappers/order/CreateOrderControllerMapper";

const orderRepository = new PrismaOrderRepository();
const orderUseCase = new OrderUseCase(orderRepository);

const getOrdersControllerMapper = new GetOrdersControllerMapper();
const createOrderControllerMapper = new CreateOrderControllerMapper();

const orderController = new OrderController(
  orderUseCase,
  getOrdersControllerMapper,
  createOrderControllerMapper
);

export async function OrderRoutes(app: FastifyInstance) {
  app.get("", orderController.getOrders.bind(orderController));
  app.post("", orderController.createOrder.bind(orderController));
}
