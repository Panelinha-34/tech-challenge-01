import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getProductsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetProductResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsControllerResponse {
  products: GetProductResponse[];
}

const responseExample: GetProductsControllerResponse = {
  products: [
    {
      id: "1",
      name: "Sandwich 1",
      description: "Sandwich 1",
      price: 5,
      category: "SANDWICH",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ],
};

export const getProductsDocSchema = {
  tags: ["Product"],
  description: "List products",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getProductsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
