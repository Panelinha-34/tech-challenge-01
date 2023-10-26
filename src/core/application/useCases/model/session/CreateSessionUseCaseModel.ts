import { Session } from "@/core/domain/entities/Session";

export interface CreateSessionUseCaseRequestModel {
  taxVat: string;
}

export interface CreateSessionUseCaseResponseModel {
  session: Session;
}
