import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { IOrderPaymentRepository } from "@/core/domain/repositories/IOrderPaymentRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderPaymentToDomainClientConverter } from "../converter/PrismaOrderPaymentToDomainClientConverter";

export class PrismaOrderPaymentRepository implements IOrderPaymentRepository {
  async create(orderPayment: OrderPayment): Promise<OrderPayment> {
    return prisma.orderPayment
      .create({
        data: {
          order_id: orderPayment.orderId,
          amount: orderPayment.amount,
          payment_method: orderPayment.payment_method,
          status: orderPayment.status
        },
      })
      .then((c) => PrismaOrderPaymentToDomainClientConverter.convert(c));
  }
}