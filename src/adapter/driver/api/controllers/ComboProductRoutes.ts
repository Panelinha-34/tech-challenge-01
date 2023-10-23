import { FastifyInstance } from "fastify";

import { 
  PrismaComboProductRepository 
} from "@/adapter/driven/infra/prisma/repositories/PrismaComboProductRepository";
import { ComboProductUseCase } from "@/core/application/useCases/ComboProductUseCase";

import { GetComboProductsControllerMapper } from './mappers/comboProduct/GetComboProductsControllerMapper';
import { CreateComboProductControllerMapper } from './mappers/comboProduct/CreateComboProductControllerMapper';
import { ComboProductController } from './ComboProductController';
import { getComboProductsDocSchema } from './model/comboProduct/GetComboProductsControllerModel';
import { createComboProductDocSchema } from './model/comboProduct/CreateComboProductControllerModel';
import { deleteComboProductDocSchema } from './model/comboProduct/DeleteComboProductControllerModel';
import { DeleteComboProductControllerMapper } from './mappers/comboProduct/DeleteComboProductControllerMapper';

const comboProductRepository = new PrismaComboProductRepository();
const comboProductUseCase = new ComboProductUseCase(comboProductRepository);

const getComboProductsControllerMapper = new GetComboProductsControllerMapper();
const createComboProductControllerMapper = new CreateComboProductControllerMapper();
const deleteComboProductControllerMapper = new DeleteComboProductControllerMapper();

const comboProductController = new ComboProductController(
  comboProductUseCase,

  getComboProductsControllerMapper,
  createComboProductControllerMapper,
  deleteComboProductControllerMapper
);

export async function ComboProductRoutes(app: FastifyInstance) {
  app.get("", {
    schema: getComboProductsDocSchema,
    handler: comboProductController.getComboProducts.bind(comboProductController),
  });

  app.post("", {
    schema: createComboProductDocSchema,
    handler: comboProductController.createComboProduct.bind(comboProductController),
  });
  
  app.delete("/:id", {
    schema: deleteComboProductDocSchema,
    handler: comboProductController.deleteComboProduct.bind(comboProductController),
  });
}
