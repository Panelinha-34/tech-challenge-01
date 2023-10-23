import { OrderRepository } from "@/core/domain/repositories/OrderRepository";

import { IOrderUseCase } from "./IOrderUseCase";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";

export class OrderUseCase implements IOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders({
    params,
  }: GetOrdersUseCaseRequestModel): Promise<GetOrdersUseCaseResponseModel> {
    const orders = await this.orderRepository.findMany(params);

    return { orders };
  }
}
