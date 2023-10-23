import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderUseCase } from "@/core/application/useCases/IOrderUseCase";

import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";
import { GetOrdersControllerResponse } from "./model/order/GetOrdersControllerModel";

export class OrderController {
  constructor(
    private orderUseCase: IOrderUseCase,
    private getOrdersControllerMapper: GetOrdersControllerMapper
  ) {}

  async getOrders(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersControllerResponse> {
    return this.orderUseCase
      .getOrders(this.getOrdersControllerMapper.convertRequestModel(req))
      .then((response) =>
        res
          .status(200)
          .send(
            this.getOrdersControllerMapper.convertSuccessfullyResponse(
              res,
              response
            )
          )
      );
  }
}
