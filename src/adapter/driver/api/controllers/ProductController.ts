import { FastifyReply, FastifyRequest } from "fastify";

import { IProductUseCase } from "@/core/application/useCases/IProductUseCase";

import { CreateProductControllerMapper } from "./mappers/product/CreateProductControllerMapper";
import { EditProductControllerMapper } from "./mappers/product/EditProductControllerMapper";
import { GetProductByIdControllerMapper } from "./mappers/product/GetProductByIdControllerMapper";
import { GetProductsByCategoryControllerMapper } from "./mappers/product/GetProductsByCategoryControllerMapper";
import { GetProductsControllerMapper } from "./mappers/product/GetProductsControllerMapper";
import { GetProductByIdControllerResponse } from "./model/product/GetProductByIdControllerModel";
import { GetProductsByCategoryControllerResponse } from "./model/product/GetProductsByCategoryControllerModel";
import { GetProductsControllerResponse } from "./model/product/GetProductsControllerModel";

export class ProductController {
  constructor(
    private productUseCase: IProductUseCase,

    private getProductsControllerMapper: GetProductsControllerMapper,
    private getProductByIdControllerMapper: GetProductByIdControllerMapper,
    private getProductsByCategoryControllerMapper: GetProductsByCategoryControllerMapper,
    private createProductControllerMapper: CreateProductControllerMapper,
    private editProductControllerMapper: EditProductControllerMapper
  ) {}

  async getProducts(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetProductsControllerResponse> {
    return this.productUseCase
      .getProducts(this.getProductsControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.getProductsControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getProductsControllerMapper.convertErrorResponse(error, res)
      );
  }

  async getProductsByCategory(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetProductsByCategoryControllerResponse> {
    return this.productUseCase
      .getProductsByCategory(
        this.getProductsByCategoryControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getProductsByCategoryControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getProductsByCategoryControllerMapper.convertErrorResponse(
          error,
          res
        )
      );
  }

  async getProductById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetProductByIdControllerResponse> {
    return this.productUseCase
      .getProductById(
        this.getProductByIdControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getProductByIdControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getProductByIdControllerMapper.convertErrorResponse(error, res)
      );
  }

  async createProduct(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.productUseCase
      .createProduct(
        this.createProductControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.createProductControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createProductControllerMapper.convertErrorResponse(error, res)
      );
  }

  async editProduct(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.productUseCase
      .editProduct(this.editProductControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.editProductControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.editProductControllerMapper.convertErrorResponse(error, res)
      );
  }
}
