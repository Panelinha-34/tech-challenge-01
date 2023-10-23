import { z } from "zod";

export const getOrdersParamsSchema = z.object({
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
