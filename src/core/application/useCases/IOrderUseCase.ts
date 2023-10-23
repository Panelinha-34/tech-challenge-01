import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";
import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";

export interface IOrderUseCase {
  getOrders(
    props: GetOrdersUseCaseRequestModel
  ): Promise<GetOrdersUseCaseResponseModel>;

  createOrder(
    props: CreateOrderUseCaseRequestModel
  ): Promise<CreateOrderUseCaseResponseModel>;
}
