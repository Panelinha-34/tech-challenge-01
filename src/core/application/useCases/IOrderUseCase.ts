import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";

export interface IOrderUseCase {
  getOrders(
    props: GetOrdersUseCaseRequestModel
  ): Promise<GetOrdersUseCaseResponseModel>;

  createOrder(
    props: CreateOrderUseCaseRequestModel
  ): Promise<CreateOrderUseCaseResponseModel>;
}
