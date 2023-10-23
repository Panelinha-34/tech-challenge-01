import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createProductPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  categoryId: z.string().uuid(),
});

export const createProductDocSchema = {
  description: "Create a product",
  tags: ["Product"],
  body: convertZodSchemaToDocsTemplate({
    schema: createProductPayloadSchema,
  }),
};
