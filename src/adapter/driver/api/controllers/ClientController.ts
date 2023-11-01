import { FastifyReply, FastifyRequest } from "fastify";

import { IClientUseCase } from "@/core/application/useCases/IClientUseCase";

import { CheckClientByTaxvatControllerMapper } from "./mappers/client/CheckClientByTaxvatControllerMapper";
import { CreateClientControllerMapper } from "./mappers/client/CreateClientControllerMapper";
import { EditClientControllerMapper } from "./mappers/client/EditClientControllerMapper";
import { GetClientByIdControllerMapper } from "./mappers/client/GetClientByIdControllerMapper";
import { GetClientsControllerMapper } from "./mappers/client/GetClientsControllerMapper";

export class ClientController {
  constructor(
    private clientUseCase: IClientUseCase,

    private getClientsControllerMapper: GetClientsControllerMapper,
    private getClientByIdControllerMapper: GetClientByIdControllerMapper,
    private createClientControllerMapper: CreateClientControllerMapper,
    private editClientControllerMapper: EditClientControllerMapper,
    private checkClientByTaxvatControllerMapper: CheckClientByTaxvatControllerMapper
  ) {}

  async getClients(req: FastifyRequest, res: FastifyReply) {
    return this.clientUseCase
      .getClients(this.getClientsControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.getClientsControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getClientsControllerMapper.convertErrorResponse(error, res)
      );
  }

  async checkClientByTaxvat(req: FastifyRequest, res: FastifyReply) {
    return this.clientUseCase
      .checkByTaxvat(
        this.checkClientByTaxvatControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.checkClientByTaxvatControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.checkClientByTaxvatControllerMapper.convertErrorResponse(
          error,
          res
        )
      );
  }

  async getClientById(req: FastifyRequest, res: FastifyReply) {
    return this.clientUseCase
      .getClientById(
        this.getClientByIdControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getClientByIdControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getClientByIdControllerMapper.convertErrorResponse(error, res)
      );
  }

  async createClient(req: FastifyRequest, res: FastifyReply) {
    return this.clientUseCase
      .createClient(this.createClientControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.createClientControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createClientControllerMapper.convertErrorResponse(error, res)
      );
  }

  async editClient(req: FastifyRequest, res: FastifyReply) {
    return this.clientUseCase
      .editClient(this.editClientControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.editClientControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.editClientControllerMapper.convertErrorResponse(error, res)
      );
  }
}
