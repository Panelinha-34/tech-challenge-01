import { z } from "zod";

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
  querystring: {
    type: "object",
    required: [],
    properties: {
      page: {
        type: "number",
        description: "page number",
      },
      pageSize: {
        type: "number",
        description: "page size",
      },
    },
  },
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
              password: { type: "string" },
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
