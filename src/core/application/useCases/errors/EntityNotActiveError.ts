import { UseCaseError } from "@/core/domain/base/error/UseCaseError";

export class EntityNotActiveError extends Error implements UseCaseError {
  details?: string[];

  constructor(entity: string, details?: string[]) {
    super(`${entity} is not active.`);

    this.details = details;
  }
}
