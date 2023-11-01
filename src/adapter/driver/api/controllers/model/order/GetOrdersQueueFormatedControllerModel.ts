import { z } from "zod";

import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getOrdersQueueFormatedQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetOrdersQueueFormatedResponse {
  number: string;
  status: string;
  clientName: string;
}

export interface GetOrdersQueueFormatedControllerResponse {
  data: GetOrdersQueueFormatedResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const responseExample: GetOrdersQueueFormatedControllerResponse = {
  data: [
    {
      number: "1",
      status: "pending",
      clientName: "123",
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getOrdersQueueFormatedDocSchema = {
  tags: ["Order "],
  description: "List the orders queue formated.",
  querystring: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
