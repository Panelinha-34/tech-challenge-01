import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateComboUseCaseRequestModel,
  CreateComboUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/CreateComboUseCaseModel";

import { createComboPayloadSchema } from "../../model/combo/CreateComboControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateComboControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateComboUseCaseRequestModel,
      CreateComboUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateComboUseCaseRequestModel {
    const { name, description, price } = createComboPayloadSchema.parse(
      req.body
    );

    return {
      name,
      description,
      price,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateComboUseCaseResponseModel
  ) {
    const combo = {
      id: useCaseResponseModel.combo.id.toString(),
      name: useCaseResponseModel.combo.name,
      description: useCaseResponseModel.combo.description,
      price: useCaseResponseModel.combo.price,
      createdAt: useCaseResponseModel.combo.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.combo.updatedAt?.toISOString(),
    };

    return res.status(200).send(combo);
  }
}
