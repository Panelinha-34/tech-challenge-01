import { Combo } from "@/core/domain/entities/Combo";

export interface EditComboUseCaseRequestModel {
  id: string;
  name?: string;
  price?: number;
  description?: string;
}

export interface EditComboUseCaseResponseModel {
  combo: Combo;
}
