import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const editProductPathParametersSchema = z.object({
  id: z.string(),
});

export const editProductPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  categoryId: z.string().uuid().optional(),
  price: z.number().optional(),
});

export interface EditProductControllerResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  createdAt: string;
  updatedAt?: string;
}

export const editProductDocSchema = {
  tags: ["Product"],
  description: "Edit Product",
  params: convertZodSchemaToDocsTemplate({
    schema: editProductPathParametersSchema,
  }),
  body: convertZodSchemaToDocsTemplate({
    schema: editProductPayloadSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        categoryId: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
