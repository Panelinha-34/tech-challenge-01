import { FastifyReply, FastifyRequest } from "fastify";

import { IClientUseCase } from "@/core/application/useCases/IClientUseCase";

import { CreateClientMapper } from "./mappers/CreateClientResponseMapper";
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

  async createClient(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.clientUseCase
      .createClient(CreateClientMapper.convertPayload(req))
      .then(() => res.status(200).send())
      .catch((error) => {
        const message = CreateClientMapper.convertErrorMessage(error);

        if (message) {
          return res.status(400).send({ message });
        }

        throw error;
      });
  }
}
