import { Client } from "@/core/domain/entities/Client";
import { ClientRepository } from "@/core/domain/repositories/ClientRepository";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";

import { IClientUseCase } from "./IClientUseCase";
import { CreateClientUseCaseProps } from "./model/CreateClientUseCaseModel";
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

  async createClient(props: CreateClientUseCaseProps): Promise<void> {
    const { email, name, taxVat } = props;

    await this.clientRepository.create(
      new Client({
        email,
        name,
        taxVat: new Taxvat({ number: taxVat }),
      })
    );
  }
}
