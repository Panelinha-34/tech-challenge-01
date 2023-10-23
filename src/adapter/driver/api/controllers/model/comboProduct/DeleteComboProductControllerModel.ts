import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const deleteComboProductByIdParametersSchema = z.object({
  id: z.string(),
});

export const deleteComboProductDocSchema = {
  description: "Delete a combo product",
  tags: ["ComboProduct"],
  params: convertZodSchemaToDocsTemplate({
    schema: deleteComboProductByIdParametersSchema,
  }),
};
