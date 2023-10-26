import { FastifyInstance } from "fastify";

import { PrismaProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaProductRepository";
import { ProductUseCase } from "@/core/application/useCases/ProductUseCase";

import { CreateProductControllerMapper } from "../mappers/product/CreateProductControllerMapper";
import { EditProductControllerMapper } from "../mappers/product/EditProductControllerMapper";
import { GetProductByIdControllerMapper } from "../mappers/product/GetProductByIdControllerMapper";
import { GetProductsByCategoryControllerMapper } from "../mappers/product/GetProductsByCategoryControllerMapper";
import { GetProductsControllerMapper } from "../mappers/product/GetProductsControllerMapper";
import { createProductDocSchema } from "../model/product/CreateProductControllerModel";
import { editProductDocSchema } from "../model/product/EditProductControllerModel";
import { getProductByIdDocSchema } from "../model/product/GetProductByIdControllerModel";
import { getProductsByCategoryDocSchema } from "../model/product/GetProductsByCategoryControllerModel";
import { getProductsDocSchema } from "../model/product/GetProductsControllerModel";
import { ProductController } from "../ProductController";

const productRepository = new PrismaProductRepository();
const productUseCase = new ProductUseCase(productRepository);

const createProductControllerMapper = new CreateProductControllerMapper();
const getProductByIdControllerMapper = new GetProductByIdControllerMapper();
const getProductsControllerMapper = new GetProductsControllerMapper();
const editProductControllerMapper = new EditProductControllerMapper();
const getProductsByCategoryControllerMapper =
  new GetProductsByCategoryControllerMapper();

const productController = new ProductController(
  productUseCase,

  getProductsControllerMapper,
  getProductByIdControllerMapper,
  getProductsByCategoryControllerMapper,
  createProductControllerMapper,
  editProductControllerMapper
);

export async function ProductRoutes(app: FastifyInstance) {
  app.get("", {
    schema: getProductsDocSchema,
    handler: productController.getProducts.bind(productController),
  });
  app.get("/:id", {
    schema: getProductByIdDocSchema,
    handler: productController.getProductById.bind(productController),
  });
  app.get("/filter_by_category/:category", {
    schema: getProductsByCategoryDocSchema,
    handler: productController.getProductsByCategory.bind(productController),
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
