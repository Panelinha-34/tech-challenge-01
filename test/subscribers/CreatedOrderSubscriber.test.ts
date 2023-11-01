/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from "vitest";

import { IOrderNotificationUseCase } from "@/core/application/useCases/IOrderNotificationUseCase";
import { OrderNotificationUseCase } from "@/core/application/useCases/OrderNotificationUseCase";
import { UpdatedOrderStatusSubscriber } from "@/core/application/useCases/subscribers/UpdatedOrderStatusSubscriber";
import { makeOrder } from "@test/repositories/factories/MakeOrder";
import { InMemoryOrderComboItemRepository } from "@test/repositories/InMemoryOrderComboRepository";
import { InMemoryOrderNotificationRepository } from "@test/repositories/InMemoryOrderNotificationRepository";
import { InMemoryOrderRepository } from "@test/repositories/InMemoryOrderRepository";

let inMemoryOrderRepository: InMemoryOrderRepository;
let inMemoryOrderComboItemRepository: InMemoryOrderComboItemRepository;

let inMemoryOrderNotificationRepository: InMemoryOrderNotificationRepository;
let orderNotificationUseCase: IOrderNotificationUseCase;

describe("UpdatedOrderStatusSubscriber", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    inMemoryOrderNotificationRepository =
      new InMemoryOrderNotificationRepository();

    orderNotificationUseCase = new OrderNotificationUseCase(
      inMemoryOrderNotificationRepository
    );

    inMemoryOrderComboItemRepository = new InMemoryOrderComboItemRepository();

    inMemoryOrderRepository = new InMemoryOrderRepository(
      inMemoryOrderComboItemRepository
    );
  });

  it("should send a notification when an order is created", async () => {
    const create = new UpdatedOrderStatusSubscriber(orderNotificationUseCase);

    const order = makeOrder();

    inMemoryOrderRepository.create(order);

    const notification = inMemoryOrderNotificationRepository.items[0];

    expect(notification).toEqual(
      expect.objectContaining({
        clientId: order.clientId,
        orderId: order.id,
      })
    );
  });
});
