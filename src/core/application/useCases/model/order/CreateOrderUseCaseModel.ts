import { Order } from "@/core/domain/entities/Order";

export interface CreateOrderUseCaseRequestModel {
  clientId?: string;
  visitorName?: string;
  paymentMethod: string;
  paymentStatus: string;
  paymentDetails?: string;
  combos: {
    sandwichId?: string;
    sideId?: string;
    drinkId?: string;
    dessertId?: string;
    quantity: number;
    annotation?: string;
  }[];
}

export interface CreateOrderUseCaseResponseModel {
  order: Order;
}
