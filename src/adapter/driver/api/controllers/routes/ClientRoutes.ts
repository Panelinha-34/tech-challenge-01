import { FastifyInstance } from "fastify";

import { makeClientRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaRepositoryFactory";
import { ClientUseCase } from "@/core/application/useCases/ClientUseCase";

import { ClientController } from "../ClientController";
import { CreateClientControllerMapper } from "../mappers/client/CreateClientControllerMapper";
import { EditClientControllerMapper } from "../mappers/client/EditClientControllerMapper";
import { GetClientByIdControllerMapper } from "../mappers/client/GetClientByIdControllerMapper";
import { GetClientsControllerMapper } from "../mappers/client/GetClientsControllerMapper";
import { createClientDocSchema } from "../model/client/CreateClientControllerModel";
import { editClientDocSchema } from "../model/client/EditClientControllerModel";
import { getClientByIdDocSchema } from "../model/client/GetClientByIdControllerModel";
import { getClientsDocSchema } from "../model/client/GetClientsControllerModel";

export async function ClientRoutes(app: FastifyInstance) {
  const clientController = new ClientController(
    new ClientUseCase(makeClientRepository()),

    new GetClientsControllerMapper(),
    new GetClientByIdControllerMapper(),
    new CreateClientControllerMapper(),
    new EditClientControllerMapper()
  );

  app.get("", {
    schema: getClientsDocSchema,
    handler: clientController.getClients.bind(clientController),
  });

  app.get("/:id", {
    schema: getClientByIdDocSchema,
    handler: clientController.getClientById.bind(clientController),
  });

  app.post("", {
    schema: createClientDocSchema,
    handler: clientController.createClient.bind(clientController),
  });

  app.put("/:id", {
    schema: editClientDocSchema,
    handler: clientController.editClient.bind(clientController),
  });
}
