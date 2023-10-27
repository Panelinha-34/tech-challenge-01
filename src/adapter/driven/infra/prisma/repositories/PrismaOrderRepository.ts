import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Order } from "@/core/domain/entities/Order";
import { IOrderComboItemRepository } from "@/core/domain/repositories/IOrderComboItemRepository";
import { IOrderProductItemRepository } from "@/core/domain/repositories/IOrderProductItemRepository";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderToDomainClientConverter } from "../converter/PrismaOrderToDomainClientConverter";

export class PrismaOrderRepository implements IOrderRepository {
  constructor(
    private orderComboItemRepository: IOrderComboItemRepository,
    private orderProductItemRepository: IOrderProductItemRepository
  ) {}

  async findMany({
    page,
    size,
  }: PaginationParams): Promise<PaginationResponse<Order>> {
    const totalItems = await prisma.order.count();
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.order.findMany({
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Order>({
      data: data.map((c) => PrismaOrderToDomainClientConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findManyByClientId(
    { page, size }: PaginationParams,
    clientId: string
  ): Promise<PaginationResponse<Order>> {
    const totalItems = await prisma.order.count({
      where: {
        client_id: clientId,
      },
    });
    const totalPages = Math.ceil(totalItems / size);

    const data = await prisma.order.findMany({
      where: {
        client_id: clientId,
      },
      skip: (page - 1) * size,
      take: size,
    });

    return new PaginationResponse<Order>({
      data: data.map((c) => PrismaOrderToDomainClientConverter.convert(c)),
      totalItems,
      currentPage: page,
      pageSize: size,
      totalPages,
    });
  }

  async findById(id: string): Promise<Order | null> {
    const order = await prisma.order.findUnique({
      where: {
        id,
      },
    });

    if (!order) {
      return null;
    }

    const products =
      await this.orderProductItemRepository.findManyByOrderId(id);

    const combos = await this.orderComboItemRepository.findManyByOrderId(id);

    return PrismaOrderToDomainClientConverter.convert(order, products, combos);
  }

  async create(order: Order): Promise<Order> {
    const createdOrder = await prisma.order
      .create({
        data: {
          id: order.id.toString(),
          status: order.status.name,
          client_id: order.clientId?.toString(),
          total_price: order.totalPrice,
          created_at: order.createdAt,
          updated_at: order.updatedAt,
        },
      })
      .then((c) => PrismaOrderToDomainClientConverter.convert(c));

    await this.orderComboItemRepository.createMany(order.combos.getItems());
    await this.orderProductItemRepository.createMany(order.products.getItems());

    return createdOrder;
  }

  async update(order: Order): Promise<Order> {
    return prisma.order
      .update({
        where: {
          id: order.id.toString(),
        },
        data: {
          status: order.status.name,
          client_id: order.clientId?.toString(),
          total_price: order.totalPrice,
          created_at: order.createdAt,
          updated_at: order.updatedAt,
        },
      })
      .then((updatedOrder) =>
        PrismaOrderToDomainClientConverter.convert(updatedOrder)
      );
  }
}
