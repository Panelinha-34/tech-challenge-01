import { FastifyInstance } from "fastify";

import { PrismaClientRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaClientRepository";
import { PrismaComboProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaComboProductRepository";
import { PrismaComboRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaComboRepository";
import { PrismaOrderComboItemRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaOrderComboItemRepository";
import { PrismaOrderProductItemRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaOrderProductItemRepository";
import { PrismaOrderRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaOrderRepository";
import { PrismaProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaProductRepository";
import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";

import { CreateOrderControllerMapper } from "../mappers/order/CreateOrderControllerMapper";
import { GetOrdersControllerMapper } from "../mappers/order/GetOrdersControllerMapper";
import { createOrderDocSchema } from "../model/order/CreateOrderControllerModel";
import { getOrdersDocSchema } from "../model/order/GetOrdersControllerModel";
import { OrderController } from "../OrderController";

const orderRepository = new PrismaOrderRepository();
const clientRepository = new PrismaClientRepository();
const productRepository = new PrismaProductRepository();
const orderComboItemRepository = new PrismaOrderComboItemRepository();
const orderProductItemRepository = new PrismaOrderProductItemRepository();
const comboRepository = new PrismaComboRepository();
const comboProductRepository = new PrismaComboProductRepository();

const comboUseCase = new ComboUseCase(
  comboRepository,
  comboProductRepository,
  productRepository
);
const orderUseCase = new OrderUseCase(
  orderRepository,
  clientRepository,
  productRepository,
  orderComboItemRepository,
  orderProductItemRepository,
  comboUseCase
);

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
