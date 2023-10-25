import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { OrderPayment as PrismaOrderPayment } from "@prisma/client";

export class PrismaOrderPaymentToDomainClientConverter {
  static convert(prismaClient: PrismaOrderPayment): OrderPayment {
    return new OrderPayment(
      { 
        orderId: prismaClient.order_id,
        amount: prismaClient.amount.toNumber(),
        payment_method: prismaClient.payment_method,
        status: prismaClient.status,
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
