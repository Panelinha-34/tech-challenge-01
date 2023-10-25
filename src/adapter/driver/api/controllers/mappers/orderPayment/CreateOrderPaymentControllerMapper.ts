import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateOrderPaymentUseCaseRequestModel,
  CreateOrderPaymentUseCaseResponseModel,
} from "@/core/application/useCases/model/orderPayment/CreateOrderPaymentUseCaseModel";

import { createOrderPaymentPayloadSchema } from "../../model/orderPayment/CreateOrderPaymentControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateOrderPaymentControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
    CreateOrderPaymentUseCaseRequestModel,
      CreateOrderPaymentUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateOrderPaymentUseCaseRequestModel {
    const { orderId, amount, payment_method, status } = createOrderPaymentPayloadSchema.parse(
      req.body
    );

    return {
      orderId,
      amount,
      payment_method,
      status
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateOrderPaymentUseCaseResponseModel
  ) {
    const orderPayment = {
      id: useCaseResponseModel.orderPayment.id.toString(),
      orderId: useCaseResponseModel.orderPayment.orderId,
      amount: useCaseResponseModel.orderPayment.amount,
      payment_method: useCaseResponseModel.orderPayment.payment_method,
      status: useCaseResponseModel.orderPayment.status,
      createdAt: useCaseResponseModel.orderPayment.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.orderPayment.updatedAt?.toISOString(),
    };

    return res.status(200).send(orderPayment);
  }
}
