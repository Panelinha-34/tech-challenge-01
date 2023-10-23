import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetComboByIdUseCaseRequestModel,
  GetComboByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/GetComboByIdUseCaseModel";

import { getComboByIdQueryParamsSchema } from "../../model/combo/GetComboByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetComboByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetComboByIdUseCaseRequestModel,
      GetComboByIdUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetComboByIdUseCaseRequestModel {
    const { id } = getComboByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetComboByIdUseCaseResponseModel
  ) {
    const combo = {
      id: useCaseResponseModel.combo.id.toString(),
      name: useCaseResponseModel.combo.name,
      price: useCaseResponseModel.combo.price,
      description: useCaseResponseModel.combo.description,
      createdAt: useCaseResponseModel.combo.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.combo.updatedAt?.toISOString(),
    };

    return res.status(200).send(combo);
  }
}
