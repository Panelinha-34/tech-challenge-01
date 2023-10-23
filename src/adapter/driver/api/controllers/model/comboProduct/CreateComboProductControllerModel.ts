import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createComboProductPayloadSchema = z.object({
  productId: z.string().uuid(),
  comboId: z.string().uuid(),
});

export const createComboProductDocSchema = {
  description: "Create a combo product",
  tags: ["ComboProduct"],
  body: convertZodSchemaToDocsTemplate({
    schema: createComboProductPayloadSchema,
  }),
};
