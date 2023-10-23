import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getProductByIdQueryParamsSchema = z.object({
  id: z.string(),
});

export interface GetProductByIdControllerResponse {
  id: string;
  name: string;
  description: string;
  price: string;
  categoryId: string;
  createdAt: string;
  updatedAt?: string;
}

export const getProductByIdDocSchema = {
  tags: ["Product"],
  description: "Get Product",
  params: convertZodSchemaToDocsTemplate({
    schema: getProductByIdQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
        description: { type: "string" },
        categoryId: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
