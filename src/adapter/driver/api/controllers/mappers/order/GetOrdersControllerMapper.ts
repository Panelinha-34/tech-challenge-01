import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "@/core/application/useCases/model/order/GetOrdersUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getOrdersQueryParamsSchema } from "../../model/order/GetOrdersControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetOrdersControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetOrdersUseCaseRequestModel,
      GetOrdersUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetOrdersUseCaseRequestModel {
    const { page, pageSize } = getOrdersQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetOrdersUseCaseResponseModel
  ) {
    const orders = response.orders.map((order) => ({
      id: order.id.toString(),
      status: order.status,
      clientId: order.clientId,
      totalPrice: order.totalPrice,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ orders });
  }
}
