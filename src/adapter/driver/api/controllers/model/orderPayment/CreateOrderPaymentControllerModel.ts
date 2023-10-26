import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createOrderPaymentPayloadSchema = z.object({
  orderId: z.string(),
  amount: z.number(),
  payment_method: z.string(),
  status: z.string(),
});

export interface CreateOrderPaymentControllerResponse {}

export const createOrderPaymentDocSchema = {
  tags: ["Order Payment (WIP)"],
  description: "Create Order Payment",
  body: convertZodSchemaToDocsTemplate({
    schema: createOrderPaymentPayloadSchema,
  }),
};
