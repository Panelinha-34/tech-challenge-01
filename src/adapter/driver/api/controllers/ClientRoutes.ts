import { FastifyInstance } from "fastify";

import { PrismaClientRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaClientRepository";
import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";

import { ClientController } from "./ClientController";
import { createClientDocSchema } from "./model/CreateClientControllerModel";
import { getClientsDocSchema } from "./model/GetClientsControllerModel";

const clientRepository = new PrismaClientRepository();
const clientUseCase = new ClientUseCase(clientRepository);
const clientController = new ClientController(clientUseCase);

export async function ClientRoutes(app: FastifyInstance) {
  app.get("", {
    schema: getClientsDocSchema,
    handler: clientController.getClients.bind(clientController),
  });

  app.post("", {
    schema: createClientDocSchema,
    handler: clientController.createClient.bind(clientController),
  });
}
