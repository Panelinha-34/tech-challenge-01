import { FastifyReply, FastifyRequest } from "fastify";

import { IClientUseCase } from "@/core/application/useCases/IClientUseCase";

import { GetClientsResponseMapper } from "./mappers/GetClientsResponseMapper";
import { GetClientsControllerResponse } from "./model/GetClientsControllerModel";

export class ClientController {
  constructor(private clientUseCase: IClientUseCase) {}

  async getClients(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetClientsControllerResponse> {
    return this.clientUseCase
      .getClients(GetClientsResponseMapper.convertRequestParams(req))
      .then((response) =>
        res.status(200).send(GetClientsResponseMapper.convertResponse(response))
      );
  }
}
