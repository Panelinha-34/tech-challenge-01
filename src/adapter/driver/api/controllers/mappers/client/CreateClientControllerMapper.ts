import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateClientUseCaseRequestModel,
  CreateClientUseCaseResponseModel,
} from "@/core/application/useCases/model/client/CreateClientUseCaseModel";

import { createClientPayloadSchema } from "../../model/client/CreateClientControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateClientControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateClientUseCaseRequestModel,
      CreateClientUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateClientUseCaseRequestModel {
    const { email, name, taxVat } = createClientPayloadSchema.parse(req.body);

    return {
      email,
      name,
      taxVat,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateClientUseCaseResponseModel
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
