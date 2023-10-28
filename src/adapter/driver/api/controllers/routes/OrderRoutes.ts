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
import { GetOrderByIdControllerMapper } from "../mappers/order/GetOrderByIdControllerMapper";
import { GetOrdersControllerMapper } from "../mappers/order/GetOrdersControllerMapper";
import { createOrderDocSchema } from "../model/order/CreateOrderControllerModel";
import { getOrderByIdDocSchema } from "../model/order/GetOrderByIdControllerModel";
import { getOrdersDocSchema } from "../model/order/GetOrdersControllerModel";
import { OrderController } from "../OrderController";

const clientRepository = new PrismaClientRepository();
const productRepository = new PrismaProductRepository();
const orderComboItemRepository = new PrismaOrderComboItemRepository();
const orderProductItemRepository = new PrismaOrderProductItemRepository();
const orderRepository = new PrismaOrderRepository(
  orderComboItemRepository,
  orderProductItemRepository
);
const comboProductRepository = new PrismaComboProductRepository();
const comboRepository = new PrismaComboRepository(comboProductRepository);

const comboUseCase = new ComboUseCase(comboRepository, productRepository);
const orderUseCase = new OrderUseCase(
  orderRepository,
  orderComboItemRepository,
  orderProductItemRepository,
  clientRepository,
  productRepository,
  comboRepository,

  comboUseCase
);

const getOrdersControllerMapper = new GetOrdersControllerMapper();
const createOrderControllerMapper = new CreateOrderControllerMapper();
const getOrderByIdControllerMapper = new GetOrderByIdControllerMapper();

const orderController = new OrderController(
  orderUseCase,
  getOrdersControllerMapper,
  createOrderControllerMapper,
  getOrderByIdControllerMapper
);

export async function OrderRoutes(app: FastifyInstance) {
  app.get("", {
    schema: getOrdersDocSchema,
    handler: orderController.getOrders.bind(orderController),
  });
  app.get("/:id", {
    schema: getOrderByIdDocSchema,
    handler: orderController.getOrderById.bind(orderController),
  });
  app.post("", {
    schema: createOrderDocSchema,
    handler: orderController.createOrder.bind(orderController),
  });
}
