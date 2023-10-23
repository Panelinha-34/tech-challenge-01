import { beforeEach, describe, expect, it, vi } from "vitest";

import { OrderUseCase } from "@/core/application/useCases/OrderUseCase";
import { InMemoryOrderRepository } from "@test/repositories/InMemoryOrderRepository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let sut: OrderUseCase;

describe("Given the Create Order Use Case", () => {
  const status = "FINISHED";
  const clientId = "uuid-client";
  const totalPrice = 20.1;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryOrderRepository = new InMemoryOrderRepository();

    sut = new OrderUseCase(inMemoryOrderRepository);
  });

  it("should create the order correctly", async () => {
    await sut.createOrder({
      clientId,
      status,
      totalPrice,
    });

    expect(
      inMemoryOrderRepository.items.filter((c) => c.totalPrice === totalPrice)
    ).toHaveLength(1);
  });
});
