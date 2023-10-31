import { FastifyReply, FastifyRequest } from "fastify";

import { IProductUseCase } from "@/core/application/useCases/IProductUseCase";

import { CreateProductControllerMapper } from "./mappers/product/CreateProductControllerMapper";
import { EditProductControllerMapper } from "./mappers/product/EditProductControllerMapper";
import { GetProductByIdControllerMapper } from "./mappers/product/GetProductByIdControllerMapper";
import { GetProductsControllerMapper } from "./mappers/product/GetProductsControllerMapper";
import { InactiveProductControllerMapper } from "./mappers/product/InactivateProductControllerMapper";
import { GetProductByIdControllerResponse } from "./model/product/GetProductByIdControllerModel";
import { GetProductsControllerResponse } from "./model/product/GetProductsControllerModel";

export class ProductController {
  constructor(
    private productUseCase: IProductUseCase,

    private getProductsControllerMapper: GetProductsControllerMapper,
    private getProductByIdControllerMapper: GetProductByIdControllerMapper,
    private createProductControllerMapper: CreateProductControllerMapper,
    private editProductControllerMapper: EditProductControllerMapper,
    private inactivateProductControllerMapper: InactiveProductControllerMapper
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

  async inactivateProduct(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<void> {
    return this.productUseCase
      .inactiveProduct(
        this.inactivateProductControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.inactivateProductControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.inactivateProductControllerMapper.convertErrorResponse(error, res)
      );
  }
}
