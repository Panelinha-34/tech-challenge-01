import { z } from "zod";

export const createClientPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  taxVat: z.string(),
});

export const createClientDocSchema = {
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      email: { type: "string" },
      taxVat: { type: "string" },
    },
    required: ["name", "email", "taxVat"],
  },
  response: {
    200: {},
  },
};
