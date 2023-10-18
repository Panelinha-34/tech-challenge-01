import {
  GetClientsUseCaseProps,
  GetClientsUseCaseResponse,
} from "./model/GetClientsUseCaseModel";

export interface IClientUseCase {
  getClients(props: GetClientsUseCaseProps): Promise<GetClientsUseCaseResponse>;
}
