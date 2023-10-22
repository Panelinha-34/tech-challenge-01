import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../utils/convertZodSchemaToDocsTemplate";

export const createClientPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  taxVat: z.string(),
});

export const createClientDocSchema = {
  description: "Create a client",
  tags: ["Client"],
  body: convertZodSchemaToDocsTemplate({
    schema: createClientPayloadSchema,
  }),
  response: {
    200: {},
  },
};
