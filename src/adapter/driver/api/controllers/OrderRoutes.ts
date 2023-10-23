import { FastifyInstance } from "fastify";

import { PrismaOrderRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaOrderRepository";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";

import { OrderController } from "./OrderController";
import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";
import { CreateOrderControllerMapper } from "./mappers/order/CreateOrderControllerMapper";
import { getOrdersDocSchema } from "./model/order/GetOrdersControllerModel";
import {
  createOrderDocSchema,
  createOrderPayloadSchema,
} from "./model/order/CreateOrderControllerModel";

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
  app.get("", {
    schema: getOrdersDocSchema,
    handler: orderController.getOrders.bind(orderController),
  });
  app.post("", {
    schema: createOrderDocSchema,
    handler: orderController.createOrder.bind(orderController),
  });
}
