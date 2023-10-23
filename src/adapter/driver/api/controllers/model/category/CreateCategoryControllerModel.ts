import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createCategoryPayloadSchema = z.object({
  name: z.string(),
});

export const createCategoryDocSchema = {
  description: "Create a category",
  tags: ["Category"],
  body: convertZodSchemaToDocsTemplate({
    schema: createCategoryPayloadSchema,
  }),
};
