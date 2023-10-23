import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateComboProductUseCaseRequestModel,
  CreateComboProductUseCaseResponseModel,
} from "@/core/application/useCases/model/comboProduct/CreateComboProductUseCaseModel";

import { createComboProductPayloadSchema } from "../../model/comboProduct/CreateComboProductControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateComboProductControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateComboProductUseCaseRequestModel,
      CreateComboProductUseCaseResponseModel
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): CreateComboProductUseCaseRequestModel {
    const { comboId, productId } = createComboProductPayloadSchema.parse(
      req.body
    );

    return {
      comboId,
      productId
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateComboProductUseCaseResponseModel
  ) {
    const combo = {
      id: useCaseResponseModel.comboProduct.id.toString(),
      comboId: useCaseResponseModel.comboProduct.comboId,
      productId: useCaseResponseModel.comboProduct.productId,
      createdAt: useCaseResponseModel.comboProduct.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.comboProduct.updatedAt?.toISOString(),
    };

    return res.status(200).send(combo);
  }
}
