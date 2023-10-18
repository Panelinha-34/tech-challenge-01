import { FastifyInstance } from "fastify";

import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";
import { InMemoryClientRepository } from "@test/repositories/InMemoryClientRepository";

import { ClientController } from "./ClientController";

const clientRepository = new InMemoryClientRepository();
const clientUseCase = new ClientUseCase(clientRepository);
const clientController = new ClientController(clientUseCase);

export async function ClientRoutes(app: FastifyInstance) {
  app.get("", clientController.getClients.bind(clientController));
}
