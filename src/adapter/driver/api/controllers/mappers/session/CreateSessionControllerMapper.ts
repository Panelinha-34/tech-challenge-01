import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateSessionUseCaseRequestModel,
  CreateSessionUseCaseResponseModel,
} from "@/core/application/useCases/model/session/CreateSessionUseCaseModel";

import {
  CreateSessionControllerResponse,
  createSessionPayloadSchema,
} from "../../model/session/CreateSessionControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateSessionControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateSessionUseCaseRequestModel,
      CreateSessionUseCaseResponseModel,
      CreateSessionControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): CreateSessionUseCaseRequestModel {
    const { taxVat } = createSessionPayloadSchema.parse(req.body);

    return {
      taxVat,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateSessionUseCaseResponseModel
  ) {
    const session = {
      id: useCaseResponseModel.session.id.toString(),
      client: {
        id: useCaseResponseModel.session.client.id.toString(),
        name: useCaseResponseModel.session.client.name,
        email: useCaseResponseModel.session.client.email,
        taxVat: useCaseResponseModel.session.client.taxVat.number,
      },
      createdAt: useCaseResponseModel.session.createdAt.toISOString(),
    };

    return res.status(200).send(session);
  }
}
