import { beforeEach, describe, expect, it, vi } from "vitest";

import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { OrderStatus } from "@prisma/client";

const coreEnum = OrderStatus;
const sut = OrderStatusEnum;

describe("Given OrderStatus database Enum", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("The OrderStatus database enum should be exactly the OrderStatus core enum", async () => {
    expect(coreEnum).toEqual(sut);
  });
});
