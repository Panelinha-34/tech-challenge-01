import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createComboPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
});

export const createComboDocSchema = {
  description: "Create a combo",
  tags: ["Combo"],
  body: convertZodSchemaToDocsTemplate({
    schema: createComboPayloadSchema,
  }),
};
