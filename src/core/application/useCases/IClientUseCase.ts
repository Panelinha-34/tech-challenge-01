import { CreateClientUseCaseProps } from "./model/CreateClientUseCaseModel";
import {
  GetClientsUseCaseProps,
  GetClientsUseCaseResponse,
} from "./model/GetClientsUseCaseModel";

export interface IClientUseCase {
  getClients(props: GetClientsUseCaseProps): Promise<GetClientsUseCaseResponse>;

  createClient(props: CreateClientUseCaseProps): Promise<void>;
}
