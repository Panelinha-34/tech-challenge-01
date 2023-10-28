import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

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

const responseExample: GetOrderNotificationsControllerResponse = {
  orderNotifications: [
    {
      id: "1",
      status: "PENDING",
      message: "Order 1",
      orderId: "1",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ],
};

export const getOrderNotificationsDocSchema = {
  tags: ["Order Notification (WIP)"],
  description: "List order notifications",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrderNotificationsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
