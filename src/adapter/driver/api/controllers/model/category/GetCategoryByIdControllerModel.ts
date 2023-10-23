import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getCategoryByIdQueryParamsSchema = z.object({
  id: z.string(),
});

export interface GetCategoryByIdControllerResponse {
  id: string;
  name: string;
  createdAt: string;
  updatedAt?: string;
}

export const getCategoryByIdDocSchema = {
  tags: ["Category"],
  description: "Get Category",
  params: convertZodSchemaToDocsTemplate({
    schema: getCategoryByIdQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
