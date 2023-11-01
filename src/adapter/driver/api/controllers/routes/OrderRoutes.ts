import { FastifyInstance } from "fastify";

import {
  makeClientRepository,
  makeComboRepository,
  makeOrderRepository,
  makeProductRepository,
} from "@/adapter/driven/infra/prisma/repositories/PrismaRepositoryFactory";
import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";

import { CreateOrderControllerMapper } from "../mappers/order/CreateOrderControllerMapper";
import { GetOrderByIdControllerMapper } from "../mappers/order/GetOrderByIdControllerMapper";
import { GetOrdersControllerMapper } from "../mappers/order/GetOrdersControllerMapper";
import { GetOrdersQueueFormatedControllerMapper } from "../mappers/order/GetOrdersQueueFormatedControllerMapper";
import { UpdateOrderStatusControllerMapper } from "../mappers/order/UpdateOrderStatusControllerMapper";
import { createOrderDocSchema } from "../model/order/CreateOrderControllerModel";
import { getOrderByIdDocSchema } from "../model/order/GetOrderByIdControllerModel";
import { getOrdersDocSchema } from "../model/order/GetOrdersControllerModel";
import { getOrdersQueueFormatedDocSchema } from "../model/order/GetOrdersQueueFormatedControllerModel";
import { updateOrderStatusDocSchema } from "../model/order/UpdateOrderStatusControllerModel";
import { OrderController } from "../OrderController";

export async function OrderRoutes(app: FastifyInstance) {
  const orderController = new OrderController(
    new OrderUseCase(
      makeOrderRepository(),
      makeClientRepository(),
      makeProductRepository(),
      makeComboRepository(),

      new ComboUseCase(makeComboRepository(), makeProductRepository())
    ),

    new GetOrdersControllerMapper(),
    new GetOrdersQueueFormatedControllerMapper(),
    new CreateOrderControllerMapper(),
    new GetOrderByIdControllerMapper(),
    new UpdateOrderStatusControllerMapper()
  );

  app.get("", {
    schema: getOrdersDocSchema,
    handler: orderController.getOrders.bind(orderController),
  });
  app.get("/queue", {
    schema: getOrdersQueueFormatedDocSchema,
    handler: orderController.getOrdersQueueFormated.bind(orderController),
  });
  app.get("/:id", {
    schema: getOrderByIdDocSchema,
    handler: orderController.getOrderById.bind(orderController),
  });
  app.post("", {
    schema: createOrderDocSchema,
    handler: orderController.createOrder.bind(orderController),
  });
  app.patch("/:id", {
    schema: updateOrderStatusDocSchema,
    handler: orderController.updateOrderStatus.bind(orderController),
  });
}
