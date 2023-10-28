import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";
import {
  GetOrderByIdUseCaseRequestModel,
  GetOrderByIdUseCaseResponseModel,
} from "./model/order/GetOrderByIdUseCaseModel";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";

export interface IOrderUseCase {
  getOrders(
    props: GetOrdersUseCaseRequestModel
  ): Promise<GetOrdersUseCaseResponseModel>;

  getOrderById(
    props: GetOrderByIdUseCaseRequestModel
  ): Promise<GetOrderByIdUseCaseResponseModel>;

  createOrder(
    props: CreateOrderUseCaseRequestModel
  ): Promise<CreateOrderUseCaseResponseModel>;
}
