import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderUseCase } from "@/core/application/useCases/IOrderUseCase";

import { CreateOrderControllerMapper } from "./mappers/order/CreateOrderControllerMapper";
import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";
import { GetOrdersControllerResponse } from "./model/order/GetOrdersControllerModel";

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
        this.getOrdersControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getOrdersControllerMapper.convertErrorResponse(error, res)
      );
  }

  async createOrder(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.orderUseCase
      .createOrder(this.createOrderControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.createOrderControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createOrderControllerMapper.convertErrorResponse(error, res)
      );
  }
}
