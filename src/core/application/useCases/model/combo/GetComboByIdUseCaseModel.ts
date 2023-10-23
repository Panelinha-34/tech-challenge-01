import { Combo } from "@/core/domain/entities/Combo";

export interface GetComboByIdUseCaseRequestModel {
  id: string;
}

export interface GetComboByIdUseCaseResponseModel {
  combo: Combo;
}
