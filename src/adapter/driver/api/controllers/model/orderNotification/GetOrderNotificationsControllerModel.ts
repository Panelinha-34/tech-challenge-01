import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getOrderNotificationsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetOrderNotificationsResponse {
  id: string;
  orderId: string;
  clientId: string;
  status: string;
  message: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetOrderNotificationsControllerResponse {
  data: GetOrderNotificationsResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const responseExample: GetOrderNotificationsControllerResponse = {
  data: [
    {
      id: "123",
      orderId: "123",
      clientId: "123",
      status: "PENDING",
      message: "Your order is pending",
      createdAt: "2021-10-26",
      updatedAt: "2021-10-27",
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getOrderNotificationsDocSchema = {
  tags: ["Order Notification "],
  description: "List order notifications",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrderNotificationsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
