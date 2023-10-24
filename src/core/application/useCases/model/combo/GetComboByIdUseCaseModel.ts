import { Combo } from "@/core/domain/entities/Combo";
import { Product } from "@/core/domain/entities/Product";

export interface GetComboByIdUseCaseRequestModel {
  id: string;
}

export interface GetComboByIdUseCaseResponseModel {
  combo: Combo;
  productDetails: Product[];
}
