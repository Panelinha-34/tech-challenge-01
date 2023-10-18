import { FastifyReply, FastifyRequest } from "fastify";

import { IClientUseCase } from "@/core/application/useCases/IClientUseCase";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetClientsControllerResponse,
  paramsSchema,
} from "./model/GetClientsControllerModel";

export class ClientController {
  constructor(private clientUseCase: IClientUseCase) {}

  async getClients(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetClientsControllerResponse> {
    const { page, pageSize } = paramsSchema.parse(req.query);

    const paginationParams = new PaginationParams(page, pageSize);

    const { clients } = await this.clientUseCase.getClients({
      paginationParams,
    });

    return res.status(200).send({ clients });
  }
}
