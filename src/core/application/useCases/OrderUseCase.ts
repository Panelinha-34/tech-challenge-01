import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";

import { IOrderUseCase } from "./IOrderUseCase";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";
import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";
import { Order } from "@/core/domain/entities/Order";

export class OrderUseCase implements IOrderUseCase {
  constructor(private orderRepository: IOrderRepository) {}

  async getOrders({
    params,
  }: GetOrdersUseCaseRequestModel): Promise<GetOrdersUseCaseResponseModel> {
    const orders = await this.orderRepository.findMany(params);

    return { orders };
  }

  async createOrder({
    status,
    totalPrice,
    clientId,
  }: CreateOrderUseCaseRequestModel): Promise<CreateOrderUseCaseResponseModel> {
    const order = await this.orderRepository.create(
      new Order({
        status,
        totalPrice,
        clientId,
      })
    );

    return { order };
  }
}
