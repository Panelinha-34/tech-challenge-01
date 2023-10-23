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

export interface IClientUseCase {
  getClients(
    props: GetClientsUseCaseRequestModel
  ): Promise<GetClientsUseCaseResponseModel>;

  getClientById(
    props: GetClientByIdUseCaseRequestModel
  ): Promise<GetClientByIdUseCaseResponseModel>;

  createClient(
    props: CreateClientUseCaseRequestModel
  ): Promise<CreateClientUseCaseResponseModel>;

  editClient(
    props: EditClientUseCaseRequestModel
  ): Promise<EditClientUseCaseResponseModel>;
}
