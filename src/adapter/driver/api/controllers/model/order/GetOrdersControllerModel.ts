import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getOrdersQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetOrdersResponse {
  id: string;
  status: string;
  clientId?: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}

export interface GetOrdersControllerResponse {
  data: GetOrdersResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const responseExample: GetOrdersControllerResponse = {
  data: [
    {
      id: "123",
      status: "pending",
      clientId: "123",
      totalPrice: 100,
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

export const getOrdersDocSchema = {
  tags: ["Order (WIP)"],
  description: "List orders",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrdersQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
