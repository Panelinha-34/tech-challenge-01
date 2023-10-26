import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetProductsByCategoryUseCaseRequestModel,
  GetProductsByCategoryUseCaseResponseModel,
} from "@/core/application/useCases/model/product/GetProductsByCategoryUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetProductsByCategoryControllerResponse,
  getProductsByCategoryPathParametersSchema,
  getProductsByCategoryQueryParamsSchema,
} from "../../model/product/GetProductsByCategoryControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetProductsByCategoryControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetProductsByCategoryUseCaseRequestModel,
      GetProductsByCategoryUseCaseResponseModel,
      GetProductsByCategoryControllerResponse
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): GetProductsByCategoryUseCaseRequestModel {
    const { page, pageSize } = getProductsByCategoryQueryParamsSchema.parse(
      req.query
    );

    const params = new PaginationParams(page, pageSize);

    const { category } = getProductsByCategoryPathParametersSchema.parse(
      req.params
    );

    return {
      params,
      category,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetProductsByCategoryUseCaseResponseModel
  ): GetProductsByCategoryControllerResponse {
    return model.paginationResponse.toResponse((product) => ({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category.name,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetProductsByCategoryUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }
}
