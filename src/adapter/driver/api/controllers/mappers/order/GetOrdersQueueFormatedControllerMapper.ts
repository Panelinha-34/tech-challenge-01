import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetOrdersQueueFormatedUseCaseRequestModel,
  GetOrdersQueueFormatedUseCaseResponseModel,
} from "@/core/application/useCases/model/order/GetOrdersQueueFormatedUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetOrdersQueueFormatedControllerResponse,
  getOrdersQueueFormatedQueryParamsSchema,
} from "../../model/order/GetOrdersQueueFormatedControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetOrdersQueueFormatedControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetOrdersQueueFormatedUseCaseRequestModel,
      GetOrdersQueueFormatedUseCaseResponseModel,
      GetOrdersQueueFormatedControllerResponse
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): GetOrdersQueueFormatedUseCaseRequestModel {
    const { page, pageSize } = getOrdersQueueFormatedQueryParamsSchema.parse(
      req.query
    );

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetOrdersQueueFormatedUseCaseResponseModel
  ): GetOrdersQueueFormatedControllerResponse {
    return model.paginationResponse.toResponse((order) => ({
      number: order.number.toString(),
      status: order.status.name,
      clientName: order.client?.name ?? order.visitorName!,
    }));
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetOrdersQueueFormatedUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }
}
