import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

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

const responseExample: EditProductControllerResponse = {
  id: "1",
  name: "Sandwich 1",
  description: "Sandwich 1",
  price: 5,
  category: "SANDWICH",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

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
      category: { type: "string" },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
