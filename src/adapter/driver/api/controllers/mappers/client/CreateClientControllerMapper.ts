/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateClientUseCaseRequestModel,
  CreateClientUseCaseResponseModel,
} from "@/core/application/useCases/model/client/CreateClientUseCaseModel";

import {
  CreateClientControllerResponse,
  createClientPayloadSchema,
} from "../../model/client/CreateClientControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateClientControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateClientUseCaseRequestModel,
      CreateClientUseCaseResponseModel,
      CreateClientControllerResponse
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
    _useCaseResponseModel: CreateClientUseCaseResponseModel
  ) {
    return res.status(201).send();
  }
}
