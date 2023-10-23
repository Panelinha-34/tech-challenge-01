import { FastifyReply, FastifyRequest } from "fastify";

import { IOrderUseCase } from "@/core/application/useCases/IOrderUseCase";

import { GetOrdersResponseMapper } from "./mappers/GetOrdersResponseMapper";
import { GetOrdersControllerResponse } from "./model/GetOrdersControllerModel";

export class OrderController {
  constructor(private orderUseCase: IOrderUseCase) {}

  async getOrders(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetOrdersControllerResponse> {
    return this.orderUseCase
      .getOrders(GetOrdersResponseMapper.convertRequestParams(req))
      .then((response) =>
        res.status(200).send(GetOrdersResponseMapper.convertResponse(response))
      );
  }
}
