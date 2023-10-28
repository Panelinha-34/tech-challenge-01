import { z } from "zod";

import { convertZodSchemaToDocsTemplate } from "../../utils/convertZodSchemaToDocsTemplate";

export const createSessionPayloadSchema = z.object({
  taxVat: z.string(),
});

export interface CreateSessionControllerResponse {}

export const createSessionDocSchema = {
  description: "Create a session",
  tags: ["Session"],
  body: convertZodSchemaToDocsTemplate({
    schema: createSessionPayloadSchema,
  }),
};
