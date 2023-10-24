import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createOrderPayloadSchema = z.object({
  status: z.string(),
  clientId: z.string(),
  totalPrice: z.number(),
});

export const createOrderDocSchema = {
  tags: ["Order (WIP)"],
  description: "Create Order",
  body: convertZodSchemaToDocsTemplate({
    schema: createOrderPayloadSchema,
  }),
};
