import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetClientByIdUseCaseRequestModel,
  GetClientByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/client/GetClientByIdUseCaseModel";

import {
  GetClientByIdControllerResponse,
  getClientByIdQueryParamsSchema,
} from "../../model/client/GetClientByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetClientByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetClientByIdUseCaseRequestModel,
      GetClientByIdUseCaseResponseModel,
      GetClientByIdControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetClientByIdUseCaseRequestModel {
    const { id } = getClientByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetClientByIdUseCaseResponseModel
  ): GetClientByIdControllerResponse {
    const client = {
      id: model.client.id.toString(),
      name: model.client.name,
      email: model.client.email,
      taxVat: model.client.taxVat.number,
      createdAt: model.client.createdAt.toISOString(),
      updatedAt: model.client.updatedAt?.toISOString(),
    };

    return client;
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetClientByIdUseCaseResponseModel
  ) {
    const client =
      this.convertUseCaseModelToControllerResponse(useCaseResponseModel);

    return res.status(200).send(client);
  }
}
