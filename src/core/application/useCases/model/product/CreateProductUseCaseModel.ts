import { Product } from "@/core/domain/entities/Product";

export interface CreateProductUseCaseRequestModel {
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface CreateProductUseCaseResponseModel {
  product: Product;
}
