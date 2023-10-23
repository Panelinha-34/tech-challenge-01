import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getCombosQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetComboResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
}

export interface GetCombosControllerResponse {
  combos: GetComboResponse[];
}

export const getCombosDocSchema = {
  tags: ["Combo"],
  description: "List combos",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getCombosQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        combos: {
          type: "array",
          items: {
            type: "object",
            properties: {
              id: { type: "string" },
              name: { type: "string" },
              description: { type: "string" },
              categoryId: { type: "string" },
              createdAt: { type: "string" },
              updatedAt: { type: "string" },
            },
          },
        },
      },
    },
  },
};
