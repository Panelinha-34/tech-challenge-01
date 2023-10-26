import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetClientsUseCaseRequestModel,
  GetClientsUseCaseResponseModel,
} from "@/core/application/useCases/model/client/GetClientsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetClientsControllerResponse,
  getClientsQueryParamsSchema,
} from "../../model/client/GetClientsControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetClientsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetClientsUseCaseRequestModel,
      GetClientsUseCaseResponseModel,
      GetClientsControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetClientsUseCaseRequestModel {
    const { page, pageSize } = getClientsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetClientsUseCaseResponseModel
  ): GetClientsControllerResponse {
    const clients = model.paginationResponse.toResponse((item) => ({
      id: item.id.toString(),
      name: item.name,
      email: item.email,
      taxVat: item.taxVat.number,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt?.toISOString(),
    }));

    return clients;
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetClientsUseCaseResponseModel
  ) {
    const clients = this.convertUseCaseModelToControllerResponse(response);

    return res.status(200).send(clients);
  }
}
