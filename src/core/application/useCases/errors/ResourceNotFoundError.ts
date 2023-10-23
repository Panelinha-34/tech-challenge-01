import { UseCaseError } from "@/core/domain/base/error/UseCaseError";

export class ResourceNotFoundError extends Error implements UseCaseError {
  entity: string;

  constructor(entity?: string) {
    super(`${entity || "Resource"} not found.`);
    this.entity = entity || "Resource";
  }
}
