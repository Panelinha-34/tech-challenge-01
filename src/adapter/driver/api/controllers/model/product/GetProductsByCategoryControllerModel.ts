import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getProductsByCategoryQueryParamsSchema = z.object({
  category: z.string(),
});

export interface GetProductResponse {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsByCategoryControllerResponse {
  products: GetProductResponse[];
}

export const getProductsByCategoryDocSchema = {
  tags: ["Product"],
  description: "List products by category",
  params: convertZodSchemaToDocsTemplate({
    schema: getProductsByCategoryQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              price: { type: "number" },
              description: { type: "string" },
              category: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
