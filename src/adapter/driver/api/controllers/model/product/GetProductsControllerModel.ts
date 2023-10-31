import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";

import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getProductsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
  category: z.nativeEnum(CategoriesEnum).optional(),
});

export interface GetProductResponse {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetProductsControllerResponse {
  data: GetProductResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const responseExample: GetProductsControllerResponse = {
  data: [
    {
      id: "1",
      name: "Product 1",
      description: "Description 1",
      active: true,
      price: 100,
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

export const getProductsDocSchema = {
  tags: ["Product"],
  description: "List products",
  querystring: {
    type: "object",
    properties: {
      page: { type: "number" },
      pageSize: { type: "number" },
      category: { type: "string", enum: Object.values(CategoriesEnum) },
    },
  },
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
