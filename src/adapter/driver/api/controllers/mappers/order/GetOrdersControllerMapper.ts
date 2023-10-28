import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "@/core/application/useCases/model/order/GetOrdersUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import {
  GetOrdersControllerResponse,
  getOrdersQueryParamsSchema,
} from "../../model/order/GetOrdersControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetOrdersControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetOrdersUseCaseRequestModel,
      GetOrdersUseCaseResponseModel,
      GetOrdersControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetOrdersUseCaseRequestModel {
    const { page, pageSize } = getOrdersQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetOrdersUseCaseResponseModel
  ): GetOrdersControllerResponse {
    return model.paginationResponse.toResponse((order) => ({
      id: order.id.toString(),
      status: order.status.name,
      clientId: order.clientId?.toString(),
      totalPrice: order.totalPrice,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt?.toISOString(),
    }));
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetOrdersUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }
}
