import { FastifyInstance } from "fastify";

import {
  makeComboRepository,
  makeProductRepository,
} from "@/adapter/driven/infra/prisma/repositories/PrismaRepositoryFactory";
import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";

import { ComboController } from "../ComboController";
import { CreateComboControllerMapper } from "../mappers/combo/CreateComboControllerMapper";
import { EditComboControllerMapper } from "../mappers/combo/EditComboControllerMapper";
import { GetComboByIdControllerMapper } from "../mappers/combo/GetComboByIdControllerMapper";
import { GetCombosControllerMapper } from "../mappers/combo/GetCombosControllerMapper";
import { createComboDocSchema } from "../model/combo/CreateComboControllerModel";
import { editComboDocSchema } from "../model/combo/EditComboControllerModel";
import { getComboByIdDocSchema } from "../model/combo/GetComboByIdControllerModel";
import { getCombosDocSchema } from "../model/combo/GetCombosControllerModel";

export async function ComboRoutes(app: FastifyInstance) {
  const comboController = new ComboController(
    new ComboUseCase(makeComboRepository(), makeProductRepository()),

    new GetCombosControllerMapper(),
    new GetComboByIdControllerMapper(),
    new CreateComboControllerMapper(),
    new EditComboControllerMapper()
  );

  app.get("", {
    schema: getCombosDocSchema,
    handler: comboController.getCombos.bind(comboController),
  });

  app.get("/:id", {
    schema: getComboByIdDocSchema,
    handler: comboController.getComboById.bind(comboController),
  });

  app.post("", {
    schema: createComboDocSchema,
    handler: comboController.createCombo.bind(comboController),
  });

  app.put("/:id", {
    schema: editComboDocSchema,
    handler: comboController.editCombo.bind(comboController),
  });
}
