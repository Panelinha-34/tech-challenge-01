import { Client } from "@/core/domain/entities/Client";
import { IClientRepository } from "@/core/domain/repositories/IClientRepository";
import { Taxvat } from "@/core/domain/valueObjects/Taxvat";

import { AttributeConflictError } from "./errors/AttributeConflictError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { IClientUseCase } from "./IClientUseCase";
import {
  CreateClientUseCaseRequestModel,
  CreateClientUseCaseResponseModel,
} from "./model/client/CreateClientUseCaseModel";
import {
  EditClientUseCaseRequestModel,
  EditClientUseCaseResponseModel,
} from "./model/client/EditClientUseCaseModel";
import {
  GetClientByIdUseCaseRequestModel,
  GetClientByIdUseCaseResponseModel,
} from "./model/client/GetClientByIdUseCaseModel";
import {
  GetClientsUseCaseRequestModel,
  GetClientsUseCaseResponseModel,
} from "./model/client/GetClientsUseCaseModel";

export class ClientUseCase implements IClientUseCase {
  constructor(private clientRepository: IClientRepository) {}

  async getClients({
    params,
  }: GetClientsUseCaseRequestModel): Promise<GetClientsUseCaseResponseModel> {
    const paginationResponse = await this.clientRepository.findMany(params);

    return { paginationResponse };
  }

  async getClientById({
    id,
  }: GetClientByIdUseCaseRequestModel): Promise<GetClientByIdUseCaseResponseModel> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new ResourceNotFoundError(Client.name);
    }

    return { client };
  }

  async createClient({
    email,
    name,
    taxVat,
  }: CreateClientUseCaseRequestModel): Promise<CreateClientUseCaseResponseModel> {
    const hasClientWithSameTaxVat =
      await this.clientRepository.findByTaxVat(taxVat);

    if (hasClientWithSameTaxVat) {
      throw new AttributeConflictError<Client>("taxVat", Client.name);
    }

    const hasClientWithSameEmail =
      await this.clientRepository.findByEmail(email);

    if (hasClientWithSameEmail) {
      throw new AttributeConflictError<Client>("email", Client.name);
    }

    const client = await this.clientRepository.create(
      new Client({
        email,
        name,
        taxVat: new Taxvat({ number: taxVat }),
      })
    );

    return { client };
  }

  async editClient({
    id,
    email,
    name,
  }: EditClientUseCaseRequestModel): Promise<EditClientUseCaseResponseModel> {
    const client = await this.clientRepository.findById(id);

    if (!client) {
      throw new ResourceNotFoundError(Client.name);
    }

    if (email) {
      const hasClientWithSameEmail =
        await this.clientRepository.findByEmail(email);

      if (hasClientWithSameEmail && hasClientWithSameEmail.id !== client.id) {
        throw new AttributeConflictError<Client>("email", Client.name);
      }
      client.email = email;
    }

    if (name) {
      client.name = name;
    }

    const updatedClient = await this.clientRepository.update(client);

    return { client: updatedClient };
  }
}
