import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getCategoriesQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetCategoriesResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetCategoriesControllerResponse {
  categories: GetCategoriesResponse[];
}

export const getCategoriesDocSchema = {
  tags: ["Category"],
  description: "List categories",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getCategoriesQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        categories: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
