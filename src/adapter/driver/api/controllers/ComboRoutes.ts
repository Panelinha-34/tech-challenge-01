import { FastifyInstance } from "fastify";

import { PrismaComboRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaComboRepository";
import { ComboUseCase } from "@/core/application/useCases/ComboUseCase";

import { ComboController } from "./ComboController";
import { GetCombosControllerMapper } from "./mappers/combo/GetCombosControllerMapper";
import { GetComboByIdControllerMapper } from "./mappers/combo/GetComboByIdControllerMapper";
import { EditComboControllerMapper } from "./mappers/combo/EditComboControllerMapper";
import { CreateComboControllerMapper } from "./mappers/combo/CreateComboControllerMapper";
import { getCombosDocSchema } from "./model/combo/GetCombosControllerModel";
import { getComboByIdDocSchema } from "./model/combo/GetComboByIdControllerModel";
import { createComboDocSchema } from "./model/combo/CreateComboControllerModel";
import { editComboDocSchema } from "./model/combo/EditComboControllerModel";

const comboRepository = new PrismaComboRepository();
const comboUseCase = new ComboUseCase(comboRepository);

const getCombosControllerMapper = new GetCombosControllerMapper();
const getComboByIdControllerMapper = new GetComboByIdControllerMapper();
const editComboControllerMapper = new EditComboControllerMapper();
const createComboControllerMapper = new CreateComboControllerMapper();

const comboController = new ComboController(
  comboUseCase,

  getCombosControllerMapper,
  getComboByIdControllerMapper,
  createComboControllerMapper,
  editComboControllerMapper
);

export async function ComboRoutes(app: FastifyInstance) {
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
