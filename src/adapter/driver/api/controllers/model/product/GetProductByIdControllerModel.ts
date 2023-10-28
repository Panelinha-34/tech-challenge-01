import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const getProductByIdQueryParamsSchema = z.object({
  id: z.string(),
});

export interface GetProductByIdControllerResponse {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

const responseExample: GetProductByIdControllerResponse = {
  id: "1",
  name: "Sandwich 1",
  description: "Sandwich 1",
  price: 5,
  category: "SANDWICH",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

export const getProductByIdDocSchema = {
  tags: ["Product"],
  description: "Get Product",
  params: convertZodSchemaToDocsTemplate({
    schema: getProductByIdQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
