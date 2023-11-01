import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "@/core/application/useCases/model/product/GetProductsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetProductsControllerResponse,
  getProductsQueryParamsSchema,
} from "../../model/product/GetProductsControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetProductsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetProductsUseCaseRequestModel,
      GetProductsUseCaseResponseModel,
      GetProductsControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetProductsUseCaseRequestModel {
    const { page, pageSize, category, includeInactive } =
      getProductsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
      includeInactive,
      category,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetProductsUseCaseResponseModel
  ): GetProductsControllerResponse {
    return model.paginationResponse.toResponse((product) => ({
      id: product.id.toString(),
      name: product.name,
      active: product.active,
      description: product.description,
      price: product.price,
      category: product.category.name,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetProductsUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }
}
