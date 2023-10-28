import { UseCaseError } from "@/core/domain/base/error/UseCaseError";

export class MinimumResourcesNotReached extends Error implements UseCaseError {
  details?: string[];

  constructor(entity: string, details?: string[]) {
    super(`Minimum ${entity} not reached`);
    this.details = details;
  }
}
