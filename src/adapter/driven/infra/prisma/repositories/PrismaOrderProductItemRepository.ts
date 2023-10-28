import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { IOrderProductItemRepository } from "@/core/domain/repositories/IOrderProductItemRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderProductItemToDomainConverter } from "../converter/PrismaOrderProductItemToDomainConverter";

export class PrismaOrderProductItemRepository
  implements IOrderProductItemRepository
{
  async findById(id: string): Promise<OrderProductItem | null> {
    return prisma.orderProductItem
      .findUnique({
        where: {
          id,
        },
      })
      .then((orderProductItem) =>
        orderProductItem
          ? PrismaOrderProductItemToDomainConverter.convert(orderProductItem)
          : null
      );
  }

  findManyByOrderId(orderId: string): Promise<OrderProductItem[]> {
    return prisma.orderProductItem
      .findMany({
        where: {
          order_id: orderId,
        },
      })
      .then((orderProductItems) =>
        orderProductItems.map((c) =>
          PrismaOrderProductItemToDomainConverter.convert(c)
        )
      );
  }

  async create(orderProductItem: OrderProductItem): Promise<OrderProductItem> {
    return prisma.orderProductItem
      .create({
        data: {
          order_id: orderProductItem.orderId.toString(),
          product_id: orderProductItem.productId.toString(),
          annotation: orderProductItem.annotation,
          quantity: orderProductItem.quantity,
          total_price: orderProductItem.totalPrice,
        },
      })
      .then((c) => PrismaOrderProductItemToDomainConverter.convert(c));
  }

  async createMany(orderProductItems: OrderProductItem[]): Promise<number> {
    return prisma.orderProductItem
      .createMany({
        data: orderProductItems.map((c) => ({
          order_id: c.orderId.toString(),
          product_id: c.productId.toString(),
          annotation: c.annotation,
          quantity: c.quantity,
          total_price: c.totalPrice,
        })),
      })
      .then(({ count }) => count);
  }

  async deleteByProductId(id: string): Promise<void> {
    await prisma.orderProductItem.deleteMany({
      where: {
        product_id: id,
      },
    });
  }
}
