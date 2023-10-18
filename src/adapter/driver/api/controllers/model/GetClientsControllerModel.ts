import { z } from "zod";

import { Client } from "@/core/domain/entities/Client";

export const paramsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetClientsControllerResponse {
  clients: Client[];
}
