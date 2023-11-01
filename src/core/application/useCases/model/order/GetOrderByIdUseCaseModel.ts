import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";

export interface GetOrderByIdUseCaseRequestModel {
  id: string;
}

export interface GetOrderByIdUseCaseResponseModel {
  order: Order;
  orderCombos: OrderComboItem[];
  combos: Combo[];
}
