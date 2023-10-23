import { FastifyRequest } from "fastify";

import {
  GetOrdersUseCaseResponse,
  GetOrdersUseCaseProps,
} from "@/core/application/useCases/model/GetOrdersUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetOrdersControllerResponse,
  getOrdersParamsSchema,
} from "../model/GetOrdersControllerModel";

export class GetOrdersResponseMapper {
  static convertResponse(
    response: GetOrdersUseCaseResponse
  ): GetOrdersControllerResponse {
    const orders = response.orders.map((order) => ({
      id: order.id.toString(),
      clientId: order.clientId,
      totalPrice: order.totalPrice,
      status: order.status,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
    }));

    return {
      orders,
    };
  }

  static convertRequestParams(req: FastifyRequest): GetOrdersUseCaseProps {
    const { page, pageSize } = getOrdersParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }
}
