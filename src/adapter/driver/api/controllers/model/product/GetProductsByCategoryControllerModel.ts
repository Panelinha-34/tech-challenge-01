import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getProductsByCategoryQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export const getProductsByCategoryPathParametersSchema = z.object({
  category: z.string(),
});

export interface GetProductsByCategoryResponse {
  id: string;
  name: string;
  price: number;
  active: boolean;
  description: string;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsByCategoryControllerResponse {
  data: GetProductsByCategoryResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const responseExample: GetProductsByCategoryControllerResponse = {
  data: [
    {
      id: "1",
      name: "Product 1",
      price: 100,
      active: true,
      description: "Description 1",
      category: "Category 1",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getProductsByCategoryDocSchema = {
  tags: ["Product"],
  description: "List products by category",
  params: convertZodSchemaToDocsTemplate({
    schema: getProductsByCategoryPathParametersSchema,
  }),
  queryString: convertZodSchemaToDocsTemplate({
    schema: getProductsByCategoryQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
