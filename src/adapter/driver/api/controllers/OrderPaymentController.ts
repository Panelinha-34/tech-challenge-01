import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderPaymentUseCase } from "@/core/application/useCases/IOrderPaymentUseCase";

import { CreateOrderPaymentControllerMapper } from "./mappers/orderPayment/CreateOrderPaymentControllerMapper";

export class OrderPaymentController {
  constructor(
    private orderPaymentUseCase: IOrderPaymentUseCase,
    private createOrderPaymentControllerMapper: CreateOrderPaymentControllerMapper
  ) {}

  async createOrderPayment(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.orderPaymentUseCase
      .createOrderPayment(this.createOrderPaymentControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.createOrderPaymentControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createOrderPaymentControllerMapper.convertErrorResponse(error, res)
      );
  }
}
