import { FastifyInstance } from "fastify";

import { OrderNotificationsPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/OrderNotificationsPrismaRepository";
import { OrderNotificationUseCase } from "@/core/application/useCases/OrderNotificationUseCase";

import { OrderNotificationController } from "./OrderNotificationController";

const orderNotificationRepository = new OrderNotificationsPrismaRepository();
const orderNotificationUseCase = new OrderNotificationUseCase(
  orderNotificationRepository
);
const orderNotificationController = new OrderNotificationController(
  orderNotificationUseCase
);

export async function OrderNotificationRoutes(app: FastifyInstance) {
  app.get(
    "",
    orderNotificationController.getOrderNotifications.bind(
      orderNotificationController
    )
  );
}
