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
    const { page, pageSize, status, clientId } =
      getOrdersQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
      status,
      clientId,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetOrdersUseCaseResponseModel
  ): GetOrdersControllerResponse {
    return model.paginationResponse.toResponse((order) => ({
      id: order.id.toString(),
      number: order.number.toString(),
      status: order.status.name,
      clientId: order.clientId?.toString(),
      visitorName: order.visitorName,
      paymentMethod: order.paymentMethod.name,
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
