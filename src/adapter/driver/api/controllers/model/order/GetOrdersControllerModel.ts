import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getOrdersQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetOrdersResponse {
  id: string;
  status: string;
  clientId: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}

export interface GetOrdersControllerResponse {
  orders: GetOrdersResponse[];
}

export const getOrdersDocSchema = {
  tags: ["Order"],
  description: "List orders",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrdersQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        orders: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              clientId: { type: "string" },
              totalPrice: { type: "number" },
              status: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
