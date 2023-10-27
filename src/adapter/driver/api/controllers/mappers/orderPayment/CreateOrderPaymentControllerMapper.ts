/* eslint-disable @typescript-eslint/naming-convention */
import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateOrderPaymentUseCaseRequestModel,
  CreateOrderPaymentUseCaseResponseModel,
} from "@/core/application/useCases/model/orderPayment/CreateOrderPaymentUseCaseModel";

import {
  CreateOrderPaymentControllerResponse,
  createOrderPaymentPayloadSchema,
} from "../../model/orderPayment/CreateOrderPaymentControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateOrderPaymentControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateOrderPaymentUseCaseRequestModel,
      CreateOrderPaymentUseCaseResponseModel,
      CreateOrderPaymentControllerResponse
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): CreateOrderPaymentUseCaseRequestModel {
    const { orderId, amount, payment_method, status } =
      createOrderPaymentPayloadSchema.parse(req.body);

    return {
      orderId,
      amount,
      payment_method,
      status,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateOrderPaymentUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }

  convertUseCaseModelToControllerResponse(
    model: CreateOrderPaymentUseCaseResponseModel
  ): CreateOrderPaymentControllerResponse {
    const orderPayment = {
      id: model.orderPayment.id.toString(),
      orderId: model.orderPayment.orderId,
      amount: model.orderPayment.amount,
      payment_method: model.orderPayment.paymentMethod,
      status: model.orderPayment.status,
      createdAt: model.orderPayment.createdAt.toISOString(),
      updatedAt: model.orderPayment.updatedAt?.toISOString(),
    };

    return orderPayment;
  }
}
