import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderUseCase } from "@/core/application/useCases/IOrderUseCase";

import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";
import { GetOrdersControllerResponse } from "./model/order/GetOrdersControllerModel";
import { CreateOrderControllerMapper } from "./mappers/order/CreateOrderControllerMapper";

export class OrderController {
  constructor(
    private orderUseCase: IOrderUseCase,
    private getOrdersControllerMapper: GetOrdersControllerMapper,
    private createOrderControllerMapper: CreateOrderControllerMapper
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

  async createOrder(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.orderUseCase
      .createOrder(this.createOrderControllerMapper.convertRequestModel(req))
      .then((response) =>
        res
          .status(200)
          .send(
            this.createOrderControllerMapper.convertSuccessfullyResponse(
              res,
              response
            )
          )
      );
  }
}
