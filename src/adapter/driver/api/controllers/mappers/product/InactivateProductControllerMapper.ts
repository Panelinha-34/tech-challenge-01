import { FastifyReply, FastifyRequest } from "fastify";

import {
  InactiveProductUseCaseRequestModel,
  InactiveProductUseCaseResponseModel,
} from "@/core/application/useCases/model/product/InactiveProductUseCaseModel";

import {
  InactiveProductControllerResponse,
  inactiveProductPathParametersSchema,
} from "../../model/product/InactiveProductControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class InactiveProductControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      InactiveProductUseCaseRequestModel,
      InactiveProductUseCaseResponseModel,
      InactiveProductControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): InactiveProductUseCaseRequestModel {
    const { id } = inactiveProductPathParametersSchema.parse(req.params);

    return {
      id,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: InactiveProductUseCaseResponseModel
  ): InactiveProductControllerResponse {
    return {
      id: model.product.id.toString(),
      name: model.product.name,
      active: model.product.active,
      description: model.product.description,
      price: model.product.price,
      category: model.product.category.name,
      createdAt: model.product.createdAt.toISOString(),
      updatedAt: model.product.updatedAt?.toISOString(),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: InactiveProductUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }
}
