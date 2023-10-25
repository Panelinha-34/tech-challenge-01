import { OrderPayment } from "@/core/domain/entities/OrderPayment";
import { IOrderPaymentRepository } from "@/core/domain/repositories/IOrderPaymentRepository";

import { IOrderPaymentUseCase } from "./IOrderPaymentUseCase";
import {
  CreateOrderPaymentUseCaseRequestModel,
  CreateOrderPaymentUseCaseResponseModel,
} from "./model/orderPayment/CreateOrderPaymentUseCaseModel";

export class OrderPaymentUseCase implements IOrderPaymentUseCase {
  constructor(private orderPaymentRepository: IOrderPaymentRepository) {}

  async createOrderPayment({
    orderId,
    amount,
    payment_method,
    status
  }: CreateOrderPaymentUseCaseRequestModel): Promise<CreateOrderPaymentUseCaseResponseModel> {
    const orderPayment = await this.orderPaymentRepository.create(
      new OrderPayment({
        orderId,
        amount,
        payment_method,
        status
      })
    );

    return { orderPayment };
  }
}
