import { FastifyReply, FastifyRequest } from "fastify";

import { ISessionUseCase } from "@/core/application/useCases/ISessionUseCase";

import { CreateSessionControllerMapper } from "./mappers/session/CreateSessionControllerMapper";

export class SessionController {
  constructor(
    private sessionUseCase: ISessionUseCase,
    private createSessionControllerMapper: CreateSessionControllerMapper
  ) {}

  async createSession(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.sessionUseCase
      .createSession(
        this.createSessionControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.createSessionControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createSessionControllerMapper.convertErrorResponse(error, res)
      );
  }
}
