import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getComboProductsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetComboProductResponse {
  id: string;
  productId: string;
  comboId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetComboProductsControllerResponse {
  comboProducts: GetComboProductResponse[];
}

export const getComboProductsDocSchema = {
  tags: ["ComboProduct"],
  description: "List combo products",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getComboProductsQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        comboProducts: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              productId: { type: "string" },
              comboId: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
