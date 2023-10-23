import { OrderRepository } from "@/core/domain/repositories/OrderRepository";

import { IOrderUseCase } from "./IOrderUseCase";
import {
  GetOrdersUseCaseProps,
  GetOrdersUseCaseResponse,
} from "./model/GetOrdersUseCaseModel";

export class OrderUseCase implements IOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders({
    params,
  }: GetOrdersUseCaseProps): Promise<GetOrdersUseCaseResponse> {
    const orders = await this.orderRepository.findMany(params);

    return { orders };
  }
}
