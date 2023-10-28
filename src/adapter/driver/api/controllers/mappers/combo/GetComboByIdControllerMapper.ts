import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetComboByIdUseCaseRequestModel,
  GetComboByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/GetComboByIdUseCaseModel";

import {
  GetComboByIdControllerResponse,
  getComboByIdQueryParamsSchema,
} from "../../model/combo/GetComboByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetComboByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetComboByIdUseCaseRequestModel,
      GetComboByIdUseCaseResponseModel,
      GetComboByIdControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetComboByIdUseCaseRequestModel {
    const { id } = getComboByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetComboByIdUseCaseResponseModel
  ): GetComboByIdControllerResponse {
    return {
      id: model.combo.id.toString(),
      name: model.combo.name,
      description: model.combo.description,
      price: model.combo.price,
      createdAt: model.combo.createdAt.toISOString(),
      updatedAt: model.combo.updatedAt?.toISOString(),
      products: model.productDetails.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category.name,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
      })),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetComboByIdUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }
}
