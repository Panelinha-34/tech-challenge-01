import { ComboProduct } from "@/core/domain/entities/ComboProduct";

export interface CreateComboProductUseCaseRequestModel {
  productId: string;
  comboId: string;
}

export interface CreateComboProductUseCaseResponseModel {
  comboProduct: ComboProduct;
}
