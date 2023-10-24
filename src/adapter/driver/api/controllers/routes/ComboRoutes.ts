import { FastifyInstance } from "fastify";

import { PrismaComboProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaComboProductRepository";
import { PrismaComboRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaComboRepository";
import { PrismaProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaProductRepository";
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

const comboRepository = new PrismaComboRepository();
const comboProductRepository = new PrismaComboProductRepository();
const productRepository = new PrismaProductRepository();
const comboUseCase = new ComboUseCase(
  comboRepository,
  comboProductRepository,
  productRepository
);

const getCombosControllerMapper = new GetCombosControllerMapper();
const getComboByIdControllerMapper = new GetComboByIdControllerMapper();
const createComboControllerMapper = new CreateComboControllerMapper();
const editComboControllerMapper = new EditComboControllerMapper();

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
