import { Combo } from "@/core/domain/entities/Combo";
import { Product } from "@/core/domain/entities/Product";

export interface CreateComboUseCaseRequestModel {
  name?: string;
  description?: string;
  sandwichId?: string;
  drinkId?: string;
  sideId?: string;
  dessertId?: string;
}

export interface CreateComboUseCaseResponseModel {
  combo: Combo;
  productDetails: Product[];
}
