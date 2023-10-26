import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Product } from "@/core/domain/entities/Product";

export interface GetProductsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetProductsUseCaseResponseModel {
  paginationResponse: PaginationResponse<Product>;
}
