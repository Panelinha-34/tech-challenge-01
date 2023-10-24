import { Combo } from "@/core/domain/entities/Combo";
import { Product } from "@/core/domain/entities/Product";

export interface EditComboUseCaseRequestModel {
  id: string;
  name?: string;
  description?: string;
  sandwichId?: string;
  drinkId?: string;
  sideId?: string;
  dessertId?: string;
}

export interface EditComboUseCaseResponseModel {
  combo: Combo;
  productDetails: Product[];
}
