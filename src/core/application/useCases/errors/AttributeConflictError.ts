import { UseCaseError } from "@/core/domain/base/error/UseCaseError";

export class AttributeConflictError<T> extends Error implements UseCaseError {
  attributeName: string;

  constructor(attribute: keyof T, entity?: string) {
    super(
      `Attribute ${attribute.toString()} already in use on ${
        entity ?? "entity"
      } `
    );
    this.attributeName = attribute.toString();
  }
}
