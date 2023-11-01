import { FastifyInstance } from "fastify";

import {
  makeComboRepository,
  makeProductRepository,
} from "@/adapter/driven/infra/prisma/repositories/PrismaRepositoryFactory";
import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";

import { ComboController } from "../ComboController";
import { GetComboByIdControllerMapper } from "../mappers/combo/GetComboByIdControllerMapper";
import { GetCombosControllerMapper } from "../mappers/combo/GetCombosControllerMapper";
import { getComboByIdDocSchema } from "../model/combo/GetComboByIdControllerModel";
import { getCombosDocSchema } from "../model/combo/GetCombosControllerModel";

export async function ComboRoutes(app: FastifyInstance) {
  const comboController = new ComboController(
    new ComboUseCase(makeComboRepository(), makeProductRepository()),

    new GetCombosControllerMapper(),
    new GetComboByIdControllerMapper()
  );

  app.get("", {
    schema: getCombosDocSchema,
    handler: comboController.getCombos.bind(comboController),
  });

  app.get("/:id", {
    schema: getComboByIdDocSchema,
    handler: comboController.getComboById.bind(comboController),
  });
}
