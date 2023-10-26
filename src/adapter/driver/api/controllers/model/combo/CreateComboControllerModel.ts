import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const createComboPayloadSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  sandwichId: z.string().optional(),
  sideId: z.string().optional(),
  drinkId: z.string().optional(),
  dessertId: z.string().optional(),
});

export interface CreateComboControllerResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt?: string;
  products: {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
    updatedAt?: string;
  }[];
}

const responseExample: CreateComboControllerResponse = {
  id: "1",
  name: "Combo 1",
  description: "Combo 1",
  price: 10,
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
  products: [
    {
      id: "1",
      name: "Sandwich 1",
      description: "Sandwich 1",
      price: 5,
      category: "SANDWICH",
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ],
};

export const createComboDocSchema = {
  description: "Create a combo",
  tags: ["Combo"],
  body: convertZodSchemaToDocsTemplate({
    schema: createComboPayloadSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
