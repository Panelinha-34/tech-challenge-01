import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getComboByIdQueryParamsSchema = z.object({
  id: z.string(),
});

export interface GetComboByIdControllerResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
  products: [
    {
      id: string;
      name: string;
      description: string;
      price: number;
      categoryId: string;
      createdAt: string;
      updatedAt?: string;
    },
  ];
}

export const getComboByIdDocSchema = {
  tags: ["Combo"],
  description: "Get Combo",
  params: convertZodSchemaToDocsTemplate({
    schema: getComboByIdQueryParamsSchema,
  }),
  response: {
    200: {
      description: "Successful response",
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        description: { type: "string" },
        price: { type: "number" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
        products: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              price: { type: "number" },
              category: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
