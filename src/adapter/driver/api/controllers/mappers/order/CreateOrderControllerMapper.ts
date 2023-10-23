import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "@/core/application/useCases/model/order/CreateOrderUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getOrdersQueryParamsSchema } from "../../model/order/GetOrdersControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";
import { createOrderPayloadSchema } from "../../model/order/CreateOrderControllerModel";

export class CreateOrderControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateOrderUseCaseRequestModel,
      CreateOrderUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateOrderUseCaseRequestModel {
    const { clientId, status, totalPrice } = createOrderPayloadSchema.parse(
      req.body
    );

    return {
      clientId,
      status,
      totalPrice,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateOrderUseCaseResponseModel
  ) {
    const order = {
      id: useCaseResponseModel.order.id.toString(),
      status: useCaseResponseModel.order.status,
      clientId: useCaseResponseModel.order.clientId,
      totalPrice: useCaseResponseModel.order.totalPrice,
      createdAt: useCaseResponseModel.order.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.order.updatedAt?.toISOString(),
    };

    return res.status(200).send(order);
  }
}
