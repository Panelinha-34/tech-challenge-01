import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "@/core/application/useCases/model/product/GetProductsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getProductsQueryParamsSchema } from "../../model/product/GetProductsControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetProductsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetProductsUseCaseRequestModel,
      GetProductsUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetProductsUseCaseRequestModel {
    const { page, pageSize } = getProductsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetProductsUseCaseResponseModel
  ) {
    const products = response.products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      categoryId: product.categoryId,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ products });
  }
}
