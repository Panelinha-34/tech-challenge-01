import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { IOrderComboItemRepository } from "@/core/domain/repositories/IOrderComboItemRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderComboItemToDomainConverter } from "../converter/PrismaOrderComboItemToDomainConverter";

export class PrismaOrderComboItemRepository
  implements IOrderComboItemRepository
{
  async findById(id: string): Promise<OrderComboItem | null> {
    return prisma.orderComboItem
      .findUnique({
        where: {
          id,
        },
      })
      .then((orderComboItem) =>
        orderComboItem
          ? PrismaOrderComboItemToDomainConverter.convert(orderComboItem)
          : null
      );
  }

  async findManyByOrderId(orderId: string): Promise<OrderComboItem[]> {
    return prisma.orderComboItem
      .findMany({
        where: {
          order_id: orderId,
        },
      })
      .then((orderComboItems) =>
        orderComboItems.map((c) =>
          PrismaOrderComboItemToDomainConverter.convert(c)
        )
      );
  }

  async findManyByComboId(comboId: string): Promise<OrderComboItem[]> {
    return prisma.orderComboItem
      .findMany({
        where: {
          combo_id: comboId,
        },
      })
      .then((orderComboItems) =>
        orderComboItems.map((c) =>
          PrismaOrderComboItemToDomainConverter.convert(c)
        )
      );
  }

  async create(orderComboItem: OrderComboItem): Promise<OrderComboItem> {
    return prisma.orderComboItem
      .create({
        data: {
          order_id: orderComboItem.orderId.toString(),
          combo_id: orderComboItem.comboId.toString(),
          annotation: orderComboItem.annotation,
          quantity: orderComboItem.quantity,
          total_price: orderComboItem.totalPrice,
        },
      })
      .then((c) => PrismaOrderComboItemToDomainConverter.convert(c));
  }

  async createMany(orderComboItems: OrderComboItem[]): Promise<number> {
    return prisma.orderComboItem
      .createMany({
        data: orderComboItems.map((c) => ({
          order_id: c.orderId.toString(),
          combo_id: c.comboId.toString(),
          annotation: c.annotation,
          quantity: c.quantity,
          total_price: c.totalPrice,
        })),
      })
      .then(({ count }) => count);
  }

  async deleteByComboId(id: string): Promise<void> {
    await prisma.orderComboItem.deleteMany({
      where: {
        combo_id: id,
      },
    });
  }
}
