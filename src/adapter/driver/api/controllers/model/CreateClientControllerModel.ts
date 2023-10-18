import { z } from "zod";

export const createClientPayloadSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  taxVat: z.string(),
});
