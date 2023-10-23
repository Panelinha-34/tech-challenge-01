import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetClientsUseCaseRequestModel,
  GetClientsUseCaseResponseModel,
} from "@/core/application/useCases/model/client/GetClientsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getClientsQueryParamsSchema } from "../../model/client/GetClientsControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetClientsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetClientsUseCaseRequestModel,
      GetClientsUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetClientsUseCaseRequestModel {
    const { page, pageSize } = getClientsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetClientsUseCaseResponseModel
  ) {
    const clients = response.clients.map((client) => ({
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      taxVat: client.taxVat.number,
      createdAt: client.createdAt.toISOString(),
      updatedAt: client.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ clients });
  }
}
