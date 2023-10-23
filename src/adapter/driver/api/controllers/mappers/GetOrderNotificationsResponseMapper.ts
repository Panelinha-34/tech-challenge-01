import { FastifyRequest } from "fastify";

import {
  GetOrderNotificationsUseCaseProps,
  GetOrderNotificationsUseCaseResponse,
} from "@/core/application/useCases/model/GetOrderNotificationsUseCaseModel";

import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetOrderNotificationsControllerResponse,
  getOrderNotificationsParamsSchema,
} from "../model/GetOrderNotificationsControllerModel";

export class GetOrderNotificationsResponseMapper {
  static convertResponse(
    response: GetOrderNotificationsUseCaseResponse
  ): GetOrderNotificationsControllerResponse {
    const orderNotifications = response.orderNotifications.map(
      (orderNotification) => ({
        id: orderNotification.id.toString(),
        message: orderNotification.message,
        status: orderNotification.status,
        orderId: orderNotification.orderId,
        createdAt: orderNotification.createdAt.toISOString(),
        updatedAt: orderNotification.updatedAt?.toISOString(),
      })
    );

    return {
      orderNotifications,
    };
  }

  static convertRequestParams(
    req: FastifyRequest
  ): GetOrderNotificationsUseCaseProps {
    const { page, pageSize } = getOrderNotificationsParamsSchema.parse(
      req.query
    );

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }
}
