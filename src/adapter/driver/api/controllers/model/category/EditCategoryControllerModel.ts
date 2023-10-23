import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const editCategoryPathParametersSchema = z.object({
  id: z.string(),
});

export const editCategoryPayloadSchema = z.object({
  name: z.string(),
});

export interface EditCategoryControllerResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export const editCategoryDocSchema = {
  tags: ["Category"],
  description: "Edit Category",
  params: convertZodSchemaToDocsTemplate({
    schema: editCategoryPathParametersSchema,
  }),
  body: convertZodSchemaToDocsTemplate({
    schema: editCategoryPayloadSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
