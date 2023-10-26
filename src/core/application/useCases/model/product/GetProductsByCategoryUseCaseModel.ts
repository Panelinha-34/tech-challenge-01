import { Product } from "@/core/domain/entities/Product";

export interface GetProductsByCategoryUseCaseRequestModel {
  category: string;
}

export interface GetProductsByCategoryUseCaseResponseModel {
  products: Product[];
}
