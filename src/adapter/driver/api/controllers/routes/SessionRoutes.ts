import { FastifyInstance } from "fastify";

import {
  makeClientRepository,
  makeSessionRepository,
} from "@/adapter/driven/infra/prisma/repositories/PrismaRepositoryFactory";
import { SessionUseCase } from "@/core/application/useCases/SessionUseCase";

import { CreateSessionControllerMapper } from "../mappers/session/CreateSessionControllerMapper";
import { createSessionDocSchema } from "../model/session/CreateSessionControllerModel";
import { SessionController } from "../SessionController";

export async function SessionRoutes(app: FastifyInstance) {
  const sessionController = new SessionController(
    new SessionUseCase(makeSessionRepository(), makeClientRepository()),

    new CreateSessionControllerMapper()
  );

  app.post("", {
    schema: createSessionDocSchema,
    handler: sessionController.createSession.bind(sessionController),
  });
}
