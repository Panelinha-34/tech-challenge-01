import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

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

const responseExample: GetClientByIdControllerResponse = {
  id: "123",
  name: "John",
  email: "john@example.com",
  taxVat: "456",
  createdAt: "2023-10-26",
  updatedAt: "2023-10-27",
};

export const getClientByIdDocSchema = {
  tags: ["Client"],
  description: "Get Client",
  params: convertZodSchemaToDocsTemplate({
    schema: getClientByIdQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
