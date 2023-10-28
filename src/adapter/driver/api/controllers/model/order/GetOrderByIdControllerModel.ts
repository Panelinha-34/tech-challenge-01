import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getOrderByIdPathParamsSchema = z.object({
  id: z.string(),
});

export interface GetOrderByIdControllerResponse {
  id: string;
  clientId?: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  clientName?: string;
  updatedAt?: string;
  combos: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
  }[];
}

const responseExample: GetOrderByIdControllerResponse = {
  id: "1",
  clientId: "1",
  status: "pending",
  totalPrice: 10,
  createdAt: "2021-01-01T00:00:00.000Z",
  clientName: "John Doe",
  updatedAt: "2021-01-01T00:00:00.000Z",
  combos: [
    {
      id: "1",
      name: "Combo 1",
      description: "Combo 1",
      price: 10,
    },
  ],
  products: [
    {
      id: "1",
      name: "Sandwich 1",
      description: "Sandwich 1",
      price: 5,
    },
  ],
};

export const getOrderByIdDocSchema = {
  tags: ["Order (WIP)"],
  description: "List orders",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getOrderByIdPathParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
