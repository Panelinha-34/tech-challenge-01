import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItemList } from "@/core/domain/entities/OrderComboItemList";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { PaymentMethodEnum } from "@/core/domain/enum/PaymentMethodEnum";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { PaymentMethod } from "@/core/domain/valueObjects/PaymentMethod";
import { Client as PrismaClient, Order as PrismaOrder } from "@prisma/client";

import { PrismaClientToDomainClientConverter } from "./PrismaClientToDomainClientConverter";

export class PrismaOrderToDomainClientConverter {
  static convert(
    prismaClient: PrismaOrder & { client?: PrismaClient | null },
    combos?: OrderComboItem[]
  ): Order {
    return new Order(
      {
        number: prismaClient.number ? BigInt(prismaClient.number) : undefined,
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
        client: prismaClient.client
          ? PrismaClientToDomainClientConverter.convert(prismaClient.client)
          : undefined,
        combos: new OrderComboItemList(combos),
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
