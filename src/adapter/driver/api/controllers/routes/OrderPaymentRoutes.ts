import { FastifyInstance } from "fastify";

import { PrismaOrderPaymentRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaOrderPaymentRepository";
import { OrderPaymentUseCase } from "@/core/application/useCases/OrderPaymentUseCase";

import { CreateOrderPaymentControllerMapper } from "../mappers/orderPayment/CreateOrderPaymentControllerMapper";
import { createOrderPaymentDocSchema } from "../model/orderPayment/CreateOrderPaymentControllerModel";
import { OrderPaymentController } from "../OrderPaymentController";

const orderPaymentRepository = new PrismaOrderPaymentRepository();
const orderPaymentUseCase = new OrderPaymentUseCase(orderPaymentRepository);

const createOrderPaymentControllerMapper = new CreateOrderPaymentControllerMapper();

const orderPaymentController = new OrderPaymentController(
  orderPaymentUseCase,
  createOrderPaymentControllerMapper
);

export async function OrderPaymentRoutes(app: FastifyInstance) {
  app.post("", {
    schema: createOrderPaymentDocSchema,
    handler: orderPaymentController.createOrderPayment.bind(orderPaymentController),
  });
}
