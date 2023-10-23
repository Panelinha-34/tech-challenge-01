import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetClientByIdUseCaseRequestModel,
  GetClientByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/client/GetClientByIdUseCaseModel";

import { getClientByIdQueryParamsSchema } from "../../model/client/GetClientByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetClientByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetClientByIdUseCaseRequestModel,
      GetClientByIdUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetClientByIdUseCaseRequestModel {
    const { id } = getClientByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetClientByIdUseCaseResponseModel
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
