import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getOrderNotificationsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetOrderNotificationsResponse {
  id: string;
  status: string;
  message: string;
  orderId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetOrderNotificationsControllerResponse {
  orderNotifications: GetOrderNotificationsResponse[];
}

export const getOrderNotificationsDocSchema = {
  tags: ["OrderNotification"],
  description: "List order notifications",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrderNotificationsQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        orderNotifications: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              orderId: { type: "string" },
              message: { type: "number" },
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
