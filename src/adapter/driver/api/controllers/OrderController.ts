import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderUseCase } from "@/core/application/useCases/IOrderUseCase";

import { CreateOrderControllerMapper } from "./mappers/order/CreateOrderControllerMapper";
import { GetOrderByIdControllerMapper } from "./mappers/order/GetOrderByIdControllerMapper";
import { GetOrdersControllerMapper } from "./mappers/order/GetOrdersControllerMapper";
import { GetOrdersQueueFormatedControllerMapper } from "./mappers/order/GetOrdersQueueFormatedControllerMapper";
import { UpdateOrderStatusControllerMapper } from "./mappers/order/UpdateOrderStatusControllerMapper";
import { GetOrdersControllerResponse } from "./model/order/GetOrdersControllerModel";
import { UpdateOrderStatusControllerResponse } from "./model/order/UpdateOrderStatusControllerModel";

export class OrderController {
  constructor(
    private orderUseCase: IOrderUseCase,
    private getOrdersControllerMapper: GetOrdersControllerMapper,
    private getOrdersQueueFormatedControllerMapper: GetOrdersQueueFormatedControllerMapper,
    private createOrderControllerMapper: CreateOrderControllerMapper,
    private getOrderByIdControllerMapper: GetOrderByIdControllerMapper,
    private updateOrderStatusControllerMapper: UpdateOrderStatusControllerMapper
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

  async getOrdersQueueFormated(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersControllerResponse> {
    return this.orderUseCase
      .getOrdersQueueFormated(
        this.getOrdersQueueFormatedControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getOrdersQueueFormatedControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getOrdersQueueFormatedControllerMapper.convertErrorResponse(
          error,
          res
        )
      );
  }

  async getOrderById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersControllerResponse> {
    return this.orderUseCase
      .getOrderById(this.getOrderByIdControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.getOrderByIdControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getOrderByIdControllerMapper.convertErrorResponse(error, res)
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

  async updateOrderStatus(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<UpdateOrderStatusControllerResponse> {
    return this.orderUseCase
      .updateOrderStatus(
        this.updateOrderStatusControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.updateOrderStatusControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.updateOrderStatusControllerMapper.convertErrorResponse(error, res)
      );
  }
}
