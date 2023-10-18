import { ClientRepository } from "@/core/domain/repositories/ClientRepository";

import { IClientUseCase } from "./IClientUseCase";
import {
  GetClientsUseCaseRequest,
  GetClientsUseCaseResponse,
} from "./model/GetClientsUseCaseModel";

export class ClientUseCase implements IClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async getClients({
    paginationParams,
  }: GetClientsUseCaseRequest): Promise<GetClientsUseCaseResponse> {
    const clients = await this.clientRepository.findMany(paginationParams);

    return { clients };
  }
}
