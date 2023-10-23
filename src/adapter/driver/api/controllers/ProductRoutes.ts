import { FastifyInstance } from "fastify";

import { PrismaProductRepository } from "@/adapter/driven/infra/prisma/repositories/PrismaProductRepository";
import { ProductUseCase } from "@/core/application/useCases/ProductUseCase";

import { ProductController } from "./ProductController";
import { CreateProductControllerMapper } from "./mappers/product/CreateProductControllerMapper";
import { GetProductByIdControllerMapper } from "./mappers/product/GetProductByIdControllerMapper";

import { createProductDocSchema } from "./model/product/CreateProductControllerModel";
import { GetProductsControllerMapper } from "./mappers/product/GetProductsControllerMapper";
import { getProductsDocSchema } from "./model/product/GetProductsControllerModel";
import { getProductByIdDocSchema } from "./model/product/GetProductByIdControllerModel";
import { editProductDocSchema } from "./model/product/EditProductControllerModel";
import { EditProductControllerMapper } from "./mappers/product/EditProductControllerMapper";

const productRepository = new PrismaProductRepository();
const productUseCase = new ProductUseCase(productRepository);

const createProductControllerMapper = new CreateProductControllerMapper();
const getProductByIdControllerMapper = new GetProductByIdControllerMapper();
const getProductsControllerMapper = new GetProductsControllerMapper();
const editProductControllerMapper = new EditProductControllerMapper();

const productController = new ProductController(
  productUseCase,

  getProductsControllerMapper,
  getProductByIdControllerMapper,
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
  app.post("", {
    schema: createProductDocSchema,
    handler: productController.createProduct.bind(productController),
  });
  app.put("/:id", {
    schema: editProductDocSchema,
    handler: productController.editProduct.bind(productController),
  });
}
