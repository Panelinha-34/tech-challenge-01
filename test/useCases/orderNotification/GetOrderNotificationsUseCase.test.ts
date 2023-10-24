import { beforeEach, describe, expect, it, vi } from "vitest";

import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { InMemoryOrderNotificationRepository } from "@test/repositories/InMemoryOrderNotificationRepository";
import { OrderNotificationUseCase } from "@/core/application/useCases/OrderNotificationUseCase";
import { makeOrderNotification } from "@test/factories/MakeOrderNotification";

let inMemoryOrderNotificationRepository: InMemoryOrderNotificationRepository;
let sut: OrderNotificationUseCase;

describe("Given the Order Notification Use Case", () => {
  const page = 1;
  const size = 10;

  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryOrderNotificationRepository =
      new InMemoryOrderNotificationRepository();

    sut = new OrderNotificationUseCase(inMemoryOrderNotificationRepository);
  });

  it("should return the order notifications correctly", async () => {
    const params = new PaginationParams(page, size);

    const orderNotificationToCreate = makeOrderNotification();

    inMemoryOrderNotificationRepository.items.push(orderNotificationToCreate);

    const { orderNotifications } = await sut.getOrderNotifications({ params });

    expect(orderNotifications).toHaveLength(1);
  });

  it("should return the order notifications from the second pagination correctly", async () => {
    const params = new PaginationParams(2, size);

    Array.from({ length: 12 }).forEach(() => {
      inMemoryOrderNotificationRepository.items.push(makeOrderNotification());
    });

    const { orderNotifications } = await sut.getOrderNotifications({ params });

    expect(orderNotifications).toHaveLength(2);
  });
});
