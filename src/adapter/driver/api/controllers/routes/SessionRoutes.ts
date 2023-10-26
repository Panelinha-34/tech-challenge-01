import { FastifyInstance } from "fastify";

import { PrismaClientRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaClientRepository";
import { SesionPrismaRepository } from "@/adapter/driven/infra/prisma/repositories/SessionPrismaRepository";
import { SessionUseCase } from "@/core/application/useCases/SessionUseCase";

import { CreateSessionControllerMapper } from "../mappers/session/CreateSessionControllerMapper";
import { createSessionDocSchema } from "../model/session/CreateSessionControllerModel";
import { SessionController } from "../SessionController";

const sessionRepository = new SesionPrismaRepository();
const clientRepository = new PrismaClientRepository();
const sessionUseCase = new SessionUseCase(sessionRepository, clientRepository);

const createSessionControllerMapper = new CreateSessionControllerMapper();

const sessionController = new SessionController(
  sessionUseCase,
  createSessionControllerMapper
);

export async function SessionRoutes(app: FastifyInstance) {
  app.post("", {
    schema: createSessionDocSchema,
    handler: sessionController.createSession.bind(sessionController),
  });
}
