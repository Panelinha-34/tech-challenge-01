import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { PaginationResponse } from "@/core/domain/base/PaginationResponse";
import { Combo } from "@/core/domain/entities/Combo";

export interface GetCombosUseCaseRequestModel {
  params: PaginationParams;
}

export interface GetCombosUseCaseResponseModel {
  paginationResponse: PaginationResponse<Combo>;
}
