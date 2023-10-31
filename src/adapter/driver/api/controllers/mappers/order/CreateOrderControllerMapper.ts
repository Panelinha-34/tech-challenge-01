/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";

import { MinimumResourcesNotReached } from "@/core/application/useCases/errors/MinimumResourcesNotReached";
import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "@/core/application/useCases/model/order/CreateOrderUseCaseModel";

import {
  CreateOrderControllerResponse,
  createOrderPayloadSchema,
} from "../../model/order/CreateOrderControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateOrderControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateOrderUseCaseRequestModel,
      CreateOrderUseCaseResponseModel,
      CreateOrderControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): CreateOrderUseCaseRequestModel {
    const parsedRequest = createOrderPayloadSchema.parse(req.body);

    return {
      ...parsedRequest,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    _useCaseResponseModel: CreateOrderUseCaseResponseModel
  ) {
    return res.status(201).send();
  }

  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply {
    if (error instanceof MinimumResourcesNotReached) {
      return res.status(400).send({
        message: `Please inform the clientId or the visitorName`,
      });
    }

    return super.convertErrorResponse(error, res);
  }
}
