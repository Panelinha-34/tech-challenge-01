import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItemList } from "@/core/domain/entities/OrderComboItemList";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { OrderProductItemList } from "@/core/domain/entities/OrderProductItemList";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { PaymentMethodEnum } from "@/core/domain/enum/PaymentMethodEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { PaymentMethod } from "@/core/domain/valueObjects/PaymentMethod";
import { Order as PrismaOrder } from "@prisma/client";

export class PrismaOrderToDomainClientConverter {
  static convert(
    prismaClient: PrismaOrder,
    products?: OrderProductItem[],
    combos?: OrderComboItem[]
  ): Order {
    return new Order(
      {
        status: new OrderStatus({
          name: prismaClient.status as OrderStatusEnum,
        }),
        clientId: prismaClient.client_id
          ? new UniqueEntityId(prismaClient.client_id)
          : undefined,
        visitorName: prismaClient.visitor_name ?? undefined,
        paymentMethod: new PaymentMethod({
          name: prismaClient.payment_method as PaymentMethodEnum,
        }),
        paymentDetails: prismaClient.payment_details ?? undefined,
        totalPrice: prismaClient.total_price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
        combos: new OrderComboItemList(combos),
        products: new OrderProductItemList(products),
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
