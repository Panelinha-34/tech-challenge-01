import { UseCaseError } from "@/core/domain/base/error/UseCaseError";

export class AttributeConflictError extends Error implements UseCaseError {
  attributeName: string;

  constructor(attribute: string, entity?: string) {
    super(`Attribute ${attribute} already in use on ${entity ?? "entity"} `);
    this.attributeName = attribute;
  }
}
