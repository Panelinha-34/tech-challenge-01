import { Product } from "@/core/domain/entities/Product";

export interface CreateProductUseCaseRequestModel {
  name: string;
  description: string;
  price: number;
  categoryId: string;
}

export interface CreateProductUseCaseResponseModel {
  product: Product;
}
