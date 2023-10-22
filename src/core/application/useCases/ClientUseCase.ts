import { Client } from "@/core/domain/entities/Client";
import { IClientRepository } from "@/core/domain/repositories/iClientRepository";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";

import { AttributeConflictError } from "./errors/AttributeConflictError";
import { IClientUseCase } from "./IClientUseCase";
import { CreateClientUseCaseProps } from "./model/CreateClientUseCaseModel";
import {
  GetClientsUseCaseProps,
  GetClientsUseCaseResponse,
} from "./model/GetClientsUseCaseModel";

export class ClientUseCase implements IClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async getClients({
    params,
  }: GetClientsUseCaseProps): Promise<GetClientsUseCaseResponse> {
    const clients = await this.clientRepository.findMany(params);

    return { clients };
  }

  async createClient(props: CreateClientUseCaseProps): Promise<void> {
    const { email, name, taxVat } = props;

    const hasClientWithSameTaxVat =
      await this.clientRepository.findByTaxVat(taxVat);

    if (hasClientWithSameTaxVat) {
      throw new AttributeConflictError("taxVat", "client");
    }

    const hasClientWithSameEmail =
      await this.clientRepository.findByEmail(email);

    if (hasClientWithSameEmail) {
      throw new AttributeConflictError("email", "client");
    }

    await this.clientRepository.create(
      new Client({
        email,
        name,
        taxVat: new Taxvat({ number: taxVat }),
      })
    );
  }
}
