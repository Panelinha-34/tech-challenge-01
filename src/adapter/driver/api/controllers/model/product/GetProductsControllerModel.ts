import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getProductsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsControllerResponse {
  products: GetProductResponse[];
}

export const getProductsDocSchema = {
  tags: ["Product"],
  description: "List products",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getProductsQueryParamsSchema,
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
              categoryId: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
