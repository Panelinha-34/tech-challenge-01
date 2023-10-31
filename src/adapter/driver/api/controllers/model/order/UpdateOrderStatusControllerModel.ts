import { z } from "zod";

import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const updateOrderStatusPathParametersSchema = z.object({
  id: z.string(),
});

export const updateOrderStatusPayloadSchema = z.object({
  status: z.nativeEnum(OrderStatusEnum),
});

export interface UpdateOrderStatusControllerResponse {
  id: string;
  status: string;
  clientId?: string;
  visitorName?: string;
  paymentMethod: string;
  totalPrice: number;
  createdAt: string;
  updatedAt?: string;
}

const responseExample: UpdateOrderStatusControllerResponse = {
  id: "123",
  status: "pending",
  clientId: "123",
  visitorName: "John Doe",
  paymentMethod: "QR_CODE",
  totalPrice: 100,
  createdAt: "2021-10-26",
  updatedAt: "2021-10-27",
};

export const updateOrderStatusDocSchema = {
  tags: ["Order "],
  description: "Update Order Status",
  params: convertZodSchemaToDocsTemplate({
    schema: updateOrderStatusPathParametersSchema,
  }),
  querystring: {
    type: "object",
    properties: {
      status: { type: "string", enum: Object.values(OrderStatusEnum) },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
