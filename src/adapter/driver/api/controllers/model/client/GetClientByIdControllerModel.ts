import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getClientByIdQueryParamsSchema = z.object({
  id: z.string(),
});

export interface GetClientByIdControllerResponse {
  id: string;
  name: string;
  email: string;
  taxVat: string;
  createdAt: string;
  updatedAt?: string;
}

export const getClientByIdDocSchema = {
  tags: ["Client"],
  description: "Get Client",
  params: convertZodSchemaToDocsTemplate({
    schema: getClientByIdQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        id: { type: "string" },
        name: { type: "string" },
        email: { type: "string" },
        taxVat: { type: "string" },
        createdAt: { type: "string" },
        updatedAt: { type: "string" },
      },
    },
  },
};
