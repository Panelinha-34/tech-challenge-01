import { FastifyInstance } from "fastify";

import { PrismaCategoryRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaCategoryRepository";
import { CategoryUseCase } from "@/core/application/useCases/CategoryUseCase";

import { CategoryController } from "./CategoryController";
import { CreateCategoryControllerMapper } from "./mappers/category/CreateCategoryControllerMapper";
import { EditCategoryControllerMapper } from "./mappers/category/EditCategoryControllerMapper";
import { GetCategoriesControllerMapper } from "./mappers/category/GetCategoriesControllerMapper";
import { GetCategoryByIdControllerMapper } from "./mappers/category/GetCategoryByIdControllerMapper";
import { createCategoryDocSchema } from "./model/category/CreateCategoryControllerModel";
import { editCategoryDocSchema } from "./model/category/EditCategoryControllerModel";
import { getCategoriesDocSchema } from "./model/category/GetCategoriesControllerModel";
import { getCategoryByIdDocSchema } from "./model/category/GetCategoryByIdControllerModel";

const categoryRepository = new PrismaCategoryRepository();
const categoryUseCase = new CategoryUseCase(categoryRepository);

const editCategoryControllerMapper = new EditCategoryControllerMapper();
const getCategoryByIdControllerMapper = new GetCategoryByIdControllerMapper();
const createCategoryControllerMapper = new CreateCategoryControllerMapper();
const getCategoriesControllerMapper = new GetCategoriesControllerMapper();

const categoryController = new CategoryController(
  categoryUseCase,

  getCategoriesControllerMapper,
  getCategoryByIdControllerMapper,
  createCategoryControllerMapper,
  editCategoryControllerMapper
);

export async function CategoryRoutes(app: FastifyInstance) {
  app.get("", {
    schema: getCategoriesDocSchema,
    handler: categoryController.getCategories.bind(categoryController),
  });

  app.get("/:id", {
    schema: getCategoryByIdDocSchema,
    handler: categoryController.getCategoryById.bind(categoryController),
  });

  app.post("", {
    schema: createCategoryDocSchema,
    handler: categoryController.createCategory.bind(categoryController),
  });

  app.put("/:id", {
    schema: editCategoryDocSchema,
    handler: categoryController.editCategory.bind(categoryController),
  });
}
