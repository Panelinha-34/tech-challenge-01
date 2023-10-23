import {
  GetOrdersUseCaseProps,
  GetOrdersUseCaseResponse,
} from "./model/GetOrdersUseCaseModel";

export interface IOrderUseCase {
  getOrders(props: GetOrdersUseCaseProps): Promise<GetOrdersUseCaseResponse>;
}
