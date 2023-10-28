import { OrderPayment } from "@/core/domain/entities/OrderPayment";

export interface CreateOrderPaymentUseCaseRequestModel {
  orderId: string;
  amount: number;
  payment_method: string;
  status: string;
}

export interface CreateOrderPaymentUseCaseResponseModel {
  orderPayment: OrderPayment;
}
