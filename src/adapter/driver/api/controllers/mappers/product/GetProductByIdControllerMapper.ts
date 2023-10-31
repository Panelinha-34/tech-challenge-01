import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetProductByIdUseCaseRequestModel,
  GetProductByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/product/GetProductByIdUseCaseModel";

import {
  GetProductByIdControllerResponse,
  getProductByIdQueryParamsSchema,
} from "../../model/product/GetProductByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetProductByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetProductByIdUseCaseRequestModel,
      GetProductByIdUseCaseResponseModel,
      GetProductByIdControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetProductByIdUseCaseRequestModel {
    const { id } = getProductByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetProductByIdUseCaseResponseModel
  ): GetProductByIdControllerResponse {
    return {
      id: model.product.id.toString(),
      name: model.product.name,
      price: model.product.price,
      active: model.product.active,
      description: model.product.description,
      category: model.product.category.name,
      createdAt: model.product.createdAt.toISOString(),
      updatedAt: model.product.updatedAt?.toISOString(),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetProductByIdUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }
}
