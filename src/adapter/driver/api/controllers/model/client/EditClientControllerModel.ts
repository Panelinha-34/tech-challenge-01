import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const editClientPathParametersSchema = z.object({
  id: z.string(),
});

export const editClientPayloadSchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
});

export interface EditClientControllerResponse {
  id: string;
  name: string;
  email: string;
  taxVat: string;
  createdAt: string;
  updatedAt?: string;
}

export const editClientDocSchema = {
  tags: ["Client"],
  description: "Edit Client",
  params: convertZodSchemaToDocsTemplate({
    schema: editClientPathParametersSchema,
  }),
  body: convertZodSchemaToDocsTemplate({
    schema: editClientPayloadSchema,
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
