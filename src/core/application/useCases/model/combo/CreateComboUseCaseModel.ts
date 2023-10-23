import { Combo } from "@/core/domain/entities/Combo";

export interface CreateComboUseCaseRequestModel {
  name: string;
  description: string;
  price: number;
}

export interface CreateComboUseCaseResponseModel {
  combo: Combo;
}
