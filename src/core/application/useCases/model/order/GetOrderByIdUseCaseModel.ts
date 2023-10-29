import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { Product } from "@/core/domain/entities/Product";

export interface GetOrderByIdUseCaseRequestModel {
  id: string;
}

export interface GetOrderByIdUseCaseResponseModel {
  order: Order;
  orderProducts: OrderProductItem[];
  orderCombos: OrderComboItem[];
  products: Product[];
  combos: Combo[];
}
