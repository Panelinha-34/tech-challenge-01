import {
  CreateSessionUseCaseRequestModel,
  CreateSessionUseCaseResponseModel,
} from "./model/session/CreateSessionUseCaseModel";

export interface ISessionUseCase {
  createSession(
    props: CreateSessionUseCaseRequestModel
  ): Promise<CreateSessionUseCaseResponseModel>;
}
