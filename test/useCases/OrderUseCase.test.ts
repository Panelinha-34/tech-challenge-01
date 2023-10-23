import { beforeEach, describe, expect, it, vi } from "vitest";

import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { makeClient } from "@test/factories/MakeClient";
import { InMemoryOrderRepository } from "@test/repositories/InMemoryOrderRepository";
import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";
import { makeOrder } from "@test/factories/MakeOrder";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: OrderUseCase;

describe("Given the Order Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryOrderRepository = new InMemoryOrderRepository();

    sut = new OrderUseCase(inMemoryOrderRepository);
  });

  it("should return the orders correctly", async () => {
    const params = new PaginationParams(page, size);

    const orderToCreate = makeOrder();

    inMemoryOrderRepository.items.push(orderToCreate);

    const { orders } = await sut.getOrders({ params });

    expect(orders).toHaveLength(1);
  });

  it("should return the clients from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryOrderRepository.items.push(makeOrder());
    });

    const { orders } = await sut.getOrders({ params });

    expect(orders).toHaveLength(2);
  });
});
