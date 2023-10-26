import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

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
  data: GetClientsResponse[];
  pagination: {
    totalItems: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
  };
}

const responseExample: GetClientsControllerResponse = {
  data: [
    {
      id: "123",
      name: "John",
      email: "john.doe@test.com",
      taxVat: "123456789",
      createdAt: "2021-10-26",
      updatedAt: "2021-10-27",
    },
  ],
  pagination: {
    totalItems: 1,
    currentPage: 1,
    pageSize: 20,
    totalPages: 1,
  },
};

export const getClientsDocSchema = {
  tags: ["Client"],
  description: "List clients",
  querystring: convertZodSchemaToDocsTemplate({
    schema: getClientsQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
