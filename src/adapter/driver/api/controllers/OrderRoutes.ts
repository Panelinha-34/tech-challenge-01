import { FastifyInstance } from "fastify";

import { OrdersPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/OrdersPrismaRepository";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";

import { OrderController } from "./OrderController";

const orderRepository = new OrdersPrismaRepository();
const orderUseCase = new OrderUseCase(orderRepository);
const orderController = new OrderController(orderUseCase);

export async function OrderRoutes(app: FastifyInstance) {
  app.get("", orderController.getOrders.bind(orderController));
}
