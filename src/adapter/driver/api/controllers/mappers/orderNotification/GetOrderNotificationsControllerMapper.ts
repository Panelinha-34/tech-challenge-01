import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "@/core/application/useCases/model/orderNotification/GetOrderNotificationsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getOrdersQueryParamsSchema } from "../../model/order/GetOrdersControllerModel";
import { GetOrderNotificationsControllerResponse } from "../../model/orderNotification/GetOrderNotificationsControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetOrderNotificationsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetOrderNotificationsUseCaseRequestModel,
      GetOrderNotificationsUseCaseResponseModel,
      GetOrderNotificationsControllerResponse
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): GetOrderNotificationsUseCaseRequestModel {
    const { page, pageSize } = getOrdersQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetOrderNotificationsUseCaseResponseModel
  ): GetOrderNotificationsControllerResponse {
    return model.paginationResponse.toResponse((orderNotification) => ({
      id: orderNotification.id.toString(),
      orderId: orderNotification.orderId.toString(),
      clientId: orderNotification.clientId.toString(),
      status: orderNotification.status.name,
      message: orderNotification.message,
      createdAt: orderNotification.createdAt.toISOString(),
      updatedAt: orderNotification.updatedAt?.toISOString(),
    }));
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetOrderNotificationsUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }
}
