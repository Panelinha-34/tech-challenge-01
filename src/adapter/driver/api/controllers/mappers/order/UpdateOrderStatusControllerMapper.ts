import { FastifyReply, FastifyRequest } from "fastify";

import {
  UpdateOrderStatusUseCaseRequestModel,
  UpdateOrderStatusUseCaseResponseModel,
} from "@/core/application/useCases/model/order/UpdateOrderStatusUseCaseModel";
import { UnsupportedArgumentValueError } from "@/core/domain/base/error/UnsupportedArgumentValueError";

import {
  UpdateOrderStatusControllerResponse,
  updateOrderStatusPathParametersSchema,
  updateOrderStatusPayloadSchema,
} from "../../model/order/UpdateOrderStatusControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class UpdateOrderStatusControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      UpdateOrderStatusUseCaseRequestModel,
      UpdateOrderStatusUseCaseResponseModel,
      UpdateOrderStatusControllerResponse
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): UpdateOrderStatusUseCaseRequestModel {
    const { id } = updateOrderStatusPathParametersSchema.parse(req.params);

    const { status } = updateOrderStatusPayloadSchema.parse(req.body);

    return {
      id,
      status,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: UpdateOrderStatusUseCaseResponseModel
  ): UpdateOrderStatusControllerResponse {
    return {
      id: model.order.id.toString(),
      status: model.order.status.name,
      clientId: model.order.clientId?.toString(),
      visitorName: model.order.visitorName,
      paymentMethod: model.order.paymentMethod.name,
      totalPrice: model.order.totalPrice,
      createdAt: model.order.createdAt.toISOString(),
      updatedAt: model.order.updatedAt?.toISOString(),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: UpdateOrderStatusUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(response));
  }

  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply {
    if (error instanceof UnsupportedArgumentValueError) {
      return res.status(400).send({
        message: `The following status is not supported comparing with the current order status`,
      });
    }

    return super.convertErrorResponse(error, res);
  }
}
