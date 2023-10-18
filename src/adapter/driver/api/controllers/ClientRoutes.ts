import { FastifyInstance } from "fastify";

import { ClientsPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/ClientsPrismaRepository";
import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";

import { ClientController } from "./ClientController";

const clientRepository = new ClientsPrismaRepository();
const clientUseCase = new ClientUseCase(clientRepository);
const clientController = new ClientController(clientUseCase);

export async function ClientRoutes(app: FastifyInstance) {
  app.get("", clientController.getClients.bind(clientController));
}
