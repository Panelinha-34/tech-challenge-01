import { Product } from "@/core/domain/entities/Product";

export interface GetProductByIdUseCaseRequestModel {
  id: string;
}

export interface GetProductByIdUseCaseResponseModel {
  product: Product;
}
