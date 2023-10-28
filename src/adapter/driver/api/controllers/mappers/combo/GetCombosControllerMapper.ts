import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetCombosUseCaseRequestModel,
  GetCombosUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/GetCombosUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetCombosControllerResponse,
  getCombosQueryParamsSchema,
} from "../../model/combo/GetCombosControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetCombosControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetCombosUseCaseRequestModel,
      GetCombosUseCaseResponseModel,
      GetCombosControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetCombosUseCaseRequestModel {
    const { page, pageSize } = getCombosQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetCombosUseCaseResponseModel
  ): GetCombosControllerResponse {
    return model.paginationResponse.toResponse((combo) => ({
      id: combo.id.toString(),
      name: combo.name,
      description: combo.description,
      price: combo.price,
      createdAt: combo.createdAt.toISOString(),
      updatedAt: combo.updatedAt?.toISOString(),
    }));
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetCombosUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }
}
