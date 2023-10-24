import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetOrderNotificationsUseCaseRequestModel,
  GetOrderNotificationsUseCaseResponseModel,
} from "@/core/application/useCases/model/orderNotification/GetOrderNotificationsUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getOrdersQueryParamsSchema } from "../../model/order/GetOrdersControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetOrderNotificationsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetOrderNotificationsUseCaseRequestModel,
      GetOrderNotificationsUseCaseResponseModel
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

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetOrderNotificationsUseCaseResponseModel
  ) {
    const orderNotifications = response.orderNotifications.map(
      (orderNotification) => ({
        id: orderNotification.id.toString(),
        status: orderNotification.status,
        message: orderNotification.message,
        orderId: orderNotification.orderId,
        createdAt: orderNotification.createdAt.toISOString(),
        updatedAt: orderNotification.updatedAt?.toISOString(),
      })
    );

    return res.status(200).send({ orderNotifications });
  }
}
