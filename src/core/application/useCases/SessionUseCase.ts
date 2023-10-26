import { Session } from "@/core/domain/entities/Session";
import { IClientRepository } from "@/core/domain/repositories/IClientRepository";
import { ISessionRepository } from "@/core/domain/repositories/ISessionRepository";

import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { ISessionUseCase } from "./ISessionUseCase";
import {
  CreateSessionUseCaseRequestModel,
  CreateSessionUseCaseResponseModel,
} from "./model/session/CreateSessionUseCaseModel";

export class SessionUseCase implements ISessionUseCase {
  constructor(
    private sessionRepository: ISessionRepository,
    private clientRepository: IClientRepository
  ) {}

  async createSession({
    taxVat,
  }: CreateSessionUseCaseRequestModel): Promise<CreateSessionUseCaseResponseModel> {
    const client = await this.clientRepository.findByTaxVat(taxVat);

    if (!client) {
      throw new ResourceNotFoundError("client");
    }

    const session = await this.sessionRepository.create(
      new Session({
        client,
      })
    );

    return { session };
  }
}
