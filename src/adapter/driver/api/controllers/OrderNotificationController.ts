import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderNotificationUseCase } from "@/core/application/useCases/IOrderNotificationUseCase";

import { GetOrderNotificationsResponseMapper } from "./mappers/GetOrderNotificationsResponseMapper";
import { GetOrderNotificationsControllerResponse } from "./model/GetOrderNotificationsControllerModel";

export class OrderNotificationController {
  constructor(private orderNotificationUseCase: IOrderNotificationUseCase) {}

  async getOrderNotifications(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrderNotificationsControllerResponse> {
    return this.orderNotificationUseCase
      .getOrderNotifications(
        GetOrderNotificationsResponseMapper.convertRequestParams(req)
      )
      .then((response) =>
        res
          .status(200)
          .send(GetOrderNotificationsResponseMapper.convertResponse(response))
      );
  }
}
