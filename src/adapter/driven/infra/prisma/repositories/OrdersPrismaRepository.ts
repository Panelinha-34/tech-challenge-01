import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Order } from "@/core/domain/entities/Order";
import { OrderRepository } from "@/core/domain/repositories/OrderRepository";

import { prisma } from "../config/prisma";
import { PrismaOrderToDomainClientConverter } from "../converter/PrismaOrderToDomainClientConverter";

export class OrdersPrismaRepository implements OrderRepository {
  async findMany({ page, size }: PaginationParams): Promise<Order[]> {
    return prisma.order
      .findMany({
        take: size,
        skip: (page - 1) * size,
      })
      .then((orders) =>
        orders.map((c) => PrismaOrderToDomainClientConverter.convert(c))
      );
  }
}