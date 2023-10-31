import { Product } from "@/core/domain/entities/Product";

export interface InactiveProductUseCaseRequestModel {
  id: string;
}

export interface InactiveProductUseCaseResponseModel {
  product: Product;
}
