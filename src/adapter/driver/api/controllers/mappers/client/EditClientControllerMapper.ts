import { FastifyReply, FastifyRequest } from "fastify";

import {
  EditClientUseCaseRequestModel,
  EditClientUseCaseResponseModel,
} from "@/core/application/useCases/model/client/EditClientUseCaseModel";

import {
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
      EditClientUseCaseResponseModel
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
    const client = {
      id: useCaseResponseModel.client.id.toString(),
      name: useCaseResponseModel.client.name,
      email: useCaseResponseModel.client.email,
      taxVat: useCaseResponseModel.client.taxVat.number,
      createdAt: useCaseResponseModel.client.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.client.updatedAt?.toISOString(),
    };

    return res.status(200).send(client);
  }
}
