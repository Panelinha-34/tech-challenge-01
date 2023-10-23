import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getComboByIdQueryParamsSchema = z.object({
  id: z.string(),
});

export interface GetComboByIdControllerResponse {
  id: string;
  name: string;
  description: string;
  price: string;
  createdAt: string;
  updatedAt?: string;
}

export const getComboByIdDocSchema = {
  tags: ["Combo"],
  description: "Get Combo",
  params: convertZodSchemaToDocsTemplate({
    schema: getComboByIdQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        price: { type: "number" },
        description: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
