import { FastifyInstance } from "fastify";

import { OrdersPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/OrdersPrismaRepository";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";

import { OrderController } from "./OrderController";
import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";

const orderRepository = new OrdersPrismaRepository();
const orderUseCase = new OrderUseCase(orderRepository);

const getOrdersControllerMapper = new GetOrdersControllerMapper();

const orderController = new OrderController(
  orderUseCase,
  getOrdersControllerMapper
);

export async function OrderRoutes(app: FastifyInstance) {
  app.get("", orderController.getOrders.bind(orderController));
}
