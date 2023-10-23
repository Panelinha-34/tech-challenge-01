import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { ComboProduct } from "@/core/domain/entities/ComboProduct";

export interface GetComboProductsUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetComboProductsUseCaseResponseModel {
  comboProducts: ComboProduct[];
}
