import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetOrderByIdUseCaseRequestModel,
  GetOrderByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/order/GetOrderByIdUseCaseModel";

import {
  GetOrderByIdControllerResponse,
  getOrderByIdPathParamsSchema,
} from "../../model/order/GetOrderByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetOrderByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetOrderByIdUseCaseRequestModel,
      GetOrderByIdUseCaseResponseModel,
      GetOrderByIdControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): GetOrderByIdUseCaseRequestModel {
    const { id } = getOrderByIdPathParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: GetOrderByIdUseCaseResponseModel
  ): GetOrderByIdControllerResponse {
    return {
      id: model.order.id.toString(),
      status: model.order.status.name,
      clientId: model.order.clientId?.toString(),
      totalPrice: model.order.totalPrice,
      createdAt: model.order.createdAt.toISOString(),
      updatedAt: model.order.updatedAt?.toISOString(),
      combos: model.combos.map((combo) => ({
        id: combo.id.toString(),
        name: combo.name,
        description: combo.description,
        price: combo.price,
      })),
      products: model.products.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
      })),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetOrderByIdUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }
}
