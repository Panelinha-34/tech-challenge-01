import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";
import { generateSchemaFromSampleObject } from "../../utils/generateSchemaFromSampleObject";

export const checkClientByTaxvatQueryParamsSchema = z.object({
  taxvat: z.string(),
});

export interface CheckClientByTaxvatControllerResponse {
  exist: boolean;
}

const responseExample: CheckClientByTaxvatControllerResponse = {
  exist: true,
};

export const checkClientByTaxvatDocSchema = {
  tags: ["Client"],
  description: "Check if there is registered client with the given taxvat.",
  querystring: convertZodSchemaToDocsTemplate({
    schema: checkClientByTaxvatQueryParamsSchema,
  }),
  response: {
    200: generateSchemaFromSampleObject(responseExample),
  },
};
