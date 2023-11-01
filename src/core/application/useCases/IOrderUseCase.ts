import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";
import {
  GetOrderByIdUseCaseRequestModel,
  GetOrderByIdUseCaseResponseModel,
} from "./model/order/GetOrderByIdUseCaseModel";
import {
  GetOrdersQueueFormatedUseCaseRequestModel,
  GetOrdersQueueFormatedUseCaseResponseModel,
} from "./model/order/GetOrdersQueueFormatedUseCaseModel";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";
import {
  UpdateOrderStatusUseCaseRequestModel,
  UpdateOrderStatusUseCaseResponseModel,
} from "./model/order/UpdateOrderStatusUseCaseModel";

export interface IOrderUseCase {
  getOrders(
    props: GetOrdersUseCaseRequestModel
  ): Promise<GetOrdersUseCaseResponseModel>;

  getOrdersQueueFormated(
    props: GetOrdersQueueFormatedUseCaseRequestModel
  ): Promise<GetOrdersQueueFormatedUseCaseResponseModel>;

  getOrderById(
    props: GetOrderByIdUseCaseRequestModel
  ): Promise<GetOrderByIdUseCaseResponseModel>;

  createOrder(
    props: CreateOrderUseCaseRequestModel
  ): Promise<CreateOrderUseCaseResponseModel>;

  updateOrderStatus(
    props: UpdateOrderStatusUseCaseRequestModel
  ): Promise<UpdateOrderStatusUseCaseResponseModel>;
}
