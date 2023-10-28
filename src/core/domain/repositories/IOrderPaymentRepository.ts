import { OrderPayment } from "../entities/OrderPayment";

export interface IOrderPaymentRepository {
  create(order: OrderPayment): Promise<OrderPayment>;
}
