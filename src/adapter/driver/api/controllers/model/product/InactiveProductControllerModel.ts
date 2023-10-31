import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const inactiveProductPathParametersSchema = z.object({
  id: z.string(),
});

export interface InactiveProductControllerResponse {
  id: string;
  name: string;
  description: string;
  active: boolean;
  price: number;
  category: string;
  createdAt: string;
  updatedAt?: string;
}

const responseExample: InactiveProductControllerResponse = {
  id: "1",
  name: "Sandwich 1",
  description: "Sandwich 1",
  active: false,
  price: 5,
  category: "SANDWICH",
  createdAt: "2021-01-01T00:00:00.000Z",
  updatedAt: "2021-01-01T00:00:00.000Z",
};

export const inactiveProductDocSchema = {
  tags: ["Product"],
  description: "Inactive product",
  params: convertZodSchemaToDocsTemplate({
    schema: inactiveProductPathParametersSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
