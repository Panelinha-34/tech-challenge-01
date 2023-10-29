import { FastifyInstance } from "fastify";

import { makeProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaRepositoryFactory";
import { ProductUseCase } from "@/core/application/useCases/ProductUseCase";

import { CreateProductControllerMapper } from "../mappers/product/CreateProductControllerMapper";
import { EditProductControllerMapper } from "../mappers/product/EditProductControllerMapper";
import { GetProductByIdControllerMapper } from "../mappers/product/GetProductByIdControllerMapper";
import { GetProductsControllerMapper } from "../mappers/product/GetProductsControllerMapper";
import { createProductDocSchema } from "../model/product/CreateProductControllerModel";
import { editProductDocSchema } from "../model/product/EditProductControllerModel";
import { getProductByIdDocSchema } from "../model/product/GetProductByIdControllerModel";
import { getProductsDocSchema } from "../model/product/GetProductsControllerModel";
import { ProductController } from "../ProductController";

export async function ProductRoutes(app: FastifyInstance) {
  const productController = new ProductController(
    new ProductUseCase(makeProductRepository()),

    new GetProductsControllerMapper(),
    new GetProductByIdControllerMapper(),
    new CreateProductControllerMapper(),
    new EditProductControllerMapper()
  );

  app.get("", {
    schema: getProductsDocSchema,
    handler: productController.getProducts.bind(productController),
  });
  app.get("/:id", {
    schema: getProductByIdDocSchema,
    handler: productController.getProductById.bind(productController),
  });
  app.post("", {
    schema: createProductDocSchema,
    handler: productController.createProduct.bind(productController),
  });
  app.put("/:id", {
    schema: editProductDocSchema,
    handler: productController.editProduct.bind(productController),
  });
}
