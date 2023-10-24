import { FastifyInstance } from "fastify";

import { OrderNotificationsPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/OrderNotificationsPrismaRepository";
import { OrderNotificationUseCase } from "@/core/application/useCases/OrderNotificationUseCase";

import { GetOrderNotificationsControllerMapper } from "../mappers/orderNotification/GetOrderNotificationsControllerMapper";
import { getOrderNotificationsDocSchema } from "../model/orderNotification/GetOrderNotificationsControllerModel";
import { OrderNotificationController } from "../OrderNotificationController";

const orderNotificationRepository = new OrderNotificationsPrismaRepository();
const orderNotificationUseCase = new OrderNotificationUseCase(
  orderNotificationRepository
);

const getOrderNotificationsControllerMapper =
  new GetOrderNotificationsControllerMapper();

const orderNotificationController = new OrderNotificationController(
  orderNotificationUseCase,
  getOrderNotificationsControllerMapper
);

export async function OrderNotificationRoutes(app: FastifyInstance) {
  app.get("", {
    schema: getOrderNotificationsDocSchema,
    handler: orderNotificationController.getOrderNotifications.bind(
      orderNotificationController
    ),
  });
}
