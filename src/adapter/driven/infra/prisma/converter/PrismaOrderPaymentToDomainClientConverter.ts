import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { PaymentMethodEnum } from "@/core/domain/enum/PaymentMethodEnum";
import { PaymentMethod } from "@/core/domain/valueObjects/PaymentMethod";
import { OrderPayment as PrismaOrderPayment } from "@prisma/client";

export class PrismaOrderPaymentToDomainClientConverter {
  static convert(prismaClient: PrismaOrderPayment): OrderPayment {
    return new OrderPayment(
      {
        orderId: prismaClient.order_id,
        amount: prismaClient.amount.toNumber(),
        paymentMethod: new PaymentMethod({
          name: prismaClient.payment_method as PaymentMethodEnum,
        }),
        status: prismaClient.status,
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
