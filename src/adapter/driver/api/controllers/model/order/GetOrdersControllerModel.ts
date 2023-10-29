import { z } from "zod";

import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";

import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getOrdersQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
  status: z.string().optional(),
  clientId: z.string().optional(),
});

export interface GetOrdersResponse {
  id: string;
  status: string;
  clientId?: string;
  visitorName?: string;
  paymentMethod: string;
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
      visitorName: "John Doe",
      paymentMethod: "QR_CODE",
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
  querystring: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
      status: { type: "string", enum: Object.values(OrderStatusEnum) },
      clientId: { type: "string" },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
