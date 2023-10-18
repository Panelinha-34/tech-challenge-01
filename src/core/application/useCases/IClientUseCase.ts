import {
  GetClientsUseCaseRequest,
  GetClientsUseCaseResponse,
} from "./model/GetClientsUseCaseModel";

export interface IClientUseCase {
  getClients(
    params: GetClientsUseCaseRequest
  ): Promise<GetClientsUseCaseResponse>;
}
