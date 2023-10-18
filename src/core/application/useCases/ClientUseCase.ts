import { ClientRepository } from "@/core/domain/repositories/ClientRepository";

import { IClientUseCase } from "./IClientUseCase";
import {
  GetClientsUseCaseProps,
  GetClientsUseCaseResponse,
} from "./model/GetClientsUseCaseModel";

export class ClientUseCase implements IClientUseCase {
  constructor(private clientRepository: ClientRepository) {}

  async getClients({
    params,
  }: GetClientsUseCaseProps): Promise<GetClientsUseCaseResponse> {
    const clients = await this.clientRepository.findMany(params);

    return { clients };
  }
}
