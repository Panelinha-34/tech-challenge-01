import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const getClientsQueryParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetClientsResponse {
  id: string;
  name: string;
  email: string;
  taxVat: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetClientsControllerResponse {
  clients: GetClientsResponse[];
}

export const getClientsDocSchema = {
  tags: ["Client"],
  description: "List clients",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getClientsQueryParamsSchema,
  }),
  response: {
    200: {
      type: "object",
      properties: {
        clients: {
          type: "array",
          items: {
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
      },
    },
  },
};
