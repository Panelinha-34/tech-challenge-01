import { Product } from "@/core/domain/entities/Product";

export interface EditProductUseCaseRequestModel {
  id: string;
  name?: string;
  price?: number;
  description?: string;
  categoryId?: string;
}

export interface EditProductUseCaseResponseModel {
  product: Product;
}
