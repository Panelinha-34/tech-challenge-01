import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const editComboPathParametersSchema = z.object({
  id: z.string(),
});

export const editComboPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  price: z.number().optional(),
});

export interface EditComboControllerResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
}

export const editComboDocSchema = {
  tags: ["Combo"],
  description: "Edit Combo",
  params: convertZodSchemaToDocsTemplate({
    schema: editComboPathParametersSchema,
  }),
  body: convertZodSchemaToDocsTemplate({
    schema: editComboPayloadSchema,
  }),
  response: {
    200: {
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
};
