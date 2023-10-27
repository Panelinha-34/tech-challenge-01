import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { Product } from "@/core/domain/entities/Product";

export interface GetOrderByIdUseCaseRequestModel {
  id: string;
}

export interface GetOrderByIdUseCaseResponseModel {
  order: Order;
  products: Product[];
  combos: Combo[];
}
