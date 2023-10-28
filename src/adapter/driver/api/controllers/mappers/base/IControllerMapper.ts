import { FastifyReply, FastifyRequest } from "fastify";

export interface IControllerMapper<
  UseCaseRequestModel,
  UseCaseResponseModel,
  ControllerResponseModel,
> {
  convertRequestModel(req: FastifyRequest): UseCaseRequestModel;
  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: UseCaseResponseModel
  ): FastifyReply;
  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply;

  convertUseCaseModelToControllerResponse?(
    model: UseCaseResponseModel
  ): ControllerResponseModel;
}
