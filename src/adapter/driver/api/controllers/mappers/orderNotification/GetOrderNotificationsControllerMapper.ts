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
    const orderNotifications = model.orderNotifications.map(
      (orderNotification) => ({
        id: orderNotification.id.toString(),
        status: orderNotification.status,
        message: orderNotification.message,
        orderId: orderNotification.orderId,
        createdAt: orderNotification.createdAt.toISOString(),
        updatedAt: orderNotification.updatedAt?.toISOString(),
      })
    );

    return { orderNotifications };
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
