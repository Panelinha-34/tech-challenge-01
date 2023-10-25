import { z } from "zod";

import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";

export const createOrderPayloadSchema = z.object({
  status: z.nativeEnum(OrderStatusEnum),
  clientId: z.string(),
  totalPrice: z.number(),
});

export const createOrderDocSchema = {
  description: "Create a order",
  tags: ["Order"],
  body: {
    type: "object",
    properties: {
      clientId: { type: "string" },
      totalPrice: { type: "number" },
      status: {
        type: "string",
        enum: Object.values(OrderStatusEnum),
      },
    },
  },
};
