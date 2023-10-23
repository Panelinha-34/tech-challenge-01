import { z } from "zod";

export const getOrderNotificationsParamsSchema = z.object({
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
