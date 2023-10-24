import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const editProductPathParametersSchema = z.object({
  id: z.string(),
});

export const editProductPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  category: z.nativeEnum(CategoriesEnum).optional(),
  price: z.number().optional(),
});

export interface EditProductControllerResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export const editProductDocSchema = {
  tags: ["Product"],
  description: "Edit Product",
  params: convertZodSchemaToDocsTemplate({
    schema: editProductPathParametersSchema,
  }),
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      category: {
        type: "string",
        enum: Object.values(CategoriesEnum),
      },
    },
  },
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        category: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
