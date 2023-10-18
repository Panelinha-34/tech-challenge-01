import { z } from "zod";

export const getClientsParamsSchema = z.object({
  page: z.coerce.number().default(1),
  pageSize: z.coerce.number().default(20),
});

export interface GetClientsResponse {
  id: string;
  name: string;
  email: string;
  password: string;
  taxVat: string;
  createdAt: string;
  updatedAt?: string;
}

export interface GetClientsControllerResponse {
  clients: GetClientsResponse[];
}
