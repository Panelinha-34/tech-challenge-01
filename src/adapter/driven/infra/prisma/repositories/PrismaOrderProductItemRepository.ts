import { PaginationParams } from "@/core/domain/base/PaginationParams";
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

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<OrderProductItem[]> {
    return prisma.orderProductItem
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((orderProductItems) =>
        orderProductItems.map((c) =>
          PrismaOrderProductItemToDomainConverter.convert(c)
        )
      );
  }

  async findManyByProductId(productId: string): Promise<OrderProductItem[]> {
    return prisma.orderProductItem
      .findMany({
        where: {
          product_id: productId,
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
          order_id: orderProductItem.orderId,
          product_id: orderProductItem.productId,
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
          order_id: c.orderId,
          product_id: c.productId,
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
