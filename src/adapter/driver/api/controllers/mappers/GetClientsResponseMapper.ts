import { FastifyRequest } from "fastify";

import {
  GetClientsUseCaseProps,
  GetClientsUseCaseResponse,
} from "@/core/application/useCases/model/GetClientsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetClientsControllerResponse,
  getClientsQueryParamsSchema,
} from "../model/GetClientsControllerModel";

export class GetClientsResponseMapper {
  static convertResponse(
    response: GetClientsUseCaseResponse
  ): GetClientsControllerResponse {
    const clients = response.clients.map((client) => ({
      id: client.id.toString(),
      name: client.name,
      email: client.email,
      taxVat: client.taxVat.number,
      createdAt: client.createdAt.toISOString(),
      updatedAt: client.updatedAt?.toISOString(),
    }));

    return {
      clients,
    };
  }

  static convertRequestParams(req: FastifyRequest): GetClientsUseCaseProps {
    const { page, pageSize } = getClientsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }
}
