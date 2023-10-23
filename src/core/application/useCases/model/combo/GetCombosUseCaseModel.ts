import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { Combo } from "@/core/domain/entities/Combo";

export interface GetCombosUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetCombosUseCaseResponseModel {
  combos: Combo[];
}
