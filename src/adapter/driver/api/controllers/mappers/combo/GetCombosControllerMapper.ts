import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetCombosUseCaseRequestModel,
  GetCombosUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/GetCombosUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getCombosQueryParamsSchema } from "../../model/combo/GetCombosControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetCombosControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetCombosUseCaseRequestModel,
      GetCombosUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetCombosUseCaseRequestModel {
    const { page, pageSize } = getCombosQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetCombosUseCaseResponseModel
  ) {
    const combos = response.combos.map((combo) => ({
      id: combo.id.toString(),
      name: combo.name,
      description: combo.description,
      price: combo.price,
      createdAt: combo.createdAt.toISOString(),
      updatedAt: combo.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ combos });
  }
}
