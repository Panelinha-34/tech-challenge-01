import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

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

const responseExample: EditClientControllerResponse = {
  id: "123",
  name: "John",
  email: "john.doe@test.com",
  taxVat: "456",
  createdAt: "2023-10-26",
  updatedAt: "2023-10-27",
};

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
    200: generateSchemaFromSampleObject(responseExample),
  },
};
