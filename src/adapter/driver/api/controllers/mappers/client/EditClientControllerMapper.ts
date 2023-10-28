import { FastifyReply, FastifyRequest } from "fastify";

import {
  EditClientUseCaseRequestModel,
  EditClientUseCaseResponseModel,
} from "@/core/application/useCases/model/client/EditClientUseCaseModel";

import {
  EditClientControllerResponse,
  editClientPathParametersSchema,
  editClientPayloadSchema,
} from "../../model/client/EditClientControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class EditClientControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      EditClientUseCaseRequestModel,
      EditClientUseCaseResponseModel,
      EditClientControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): EditClientUseCaseRequestModel {
    const { id } = editClientPathParametersSchema.parse(req.params);
    const { email, name } = editClientPayloadSchema.parse(req.body);

    return {
      id,
      email,
      name,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: EditClientUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }

  convertUseCaseModelToControllerResponse(
    model: EditClientUseCaseResponseModel
  ): EditClientControllerResponse {
    return {
      id: model.client.id.toString(),
      name: model.client.name,
      email: model.client.email,
      taxVat: model.client.taxVat.number,
      createdAt: model.client.createdAt.toISOString(),
      updatedAt: model.client.updatedAt?.toISOString(),
    };
  }
}
