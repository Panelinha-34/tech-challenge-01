import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const editComboPathParametersSchema = z.object({
  id: z.string(),
});

export const editComboPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  sandwichId: z.string().optional(),
  sideId: z.string().optional(),
  drinkId: z.string().optional(),
  dessertId: z.string().optional(),
});

export interface EditComboControllerResponse {
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
