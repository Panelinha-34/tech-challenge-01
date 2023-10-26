import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

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

const responseExample: GetCombosControllerResponse = {
  combos: [
    {
      id: "1",
      name: "Combo 1",
      description: "Combo 1",
      price: 10,
      createdAt: "2021-01-01T00:00:00.000Z",
      updatedAt: "2021-01-01T00:00:00.000Z",
    },
  ],
};

export const getCombosDocSchema = {
  tags: ["Combo"],
  description: "List combos",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getCombosQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
