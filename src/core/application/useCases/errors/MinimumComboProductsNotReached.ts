import { UseCaseError } from "@/core/domain/base/error/UseCaseError";

export class MinimumComboProductsNotReached
  extends Error
  implements UseCaseError
{
  constructor() {
    super(`Combo must have at least 1 product`);
  }
}
