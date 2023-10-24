import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderNotificationUseCase } from "@/core/application/useCases/IOrderNotificationUseCase";

import { GetOrderNotificationsControllerMapper } from "./mappers/orderNotification/GetOrderNotificationsControllerMapper";
import { GetOrderNotificationsControllerResponse } from "./model/orderNotification/GetOrderNotificationsControllerModel";

export class OrderNotificationController {
  constructor(
    private orderNotificationUseCase: IOrderNotificationUseCase,
    private getOrderNotificationsControllerMapper: GetOrderNotificationsControllerMapper
  ) {}

  async getOrderNotifications(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrderNotificationsControllerResponse> {
    return this.orderNotificationUseCase
      .getOrderNotifications(
        this.getOrderNotificationsControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        res
          .status(200)
          .send(
            this.getOrderNotificationsControllerMapper.convertSuccessfullyResponse(
              res,
              response
            )
          )
      );
  }
}
