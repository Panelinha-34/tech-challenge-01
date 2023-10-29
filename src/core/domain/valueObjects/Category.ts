import { ValueObject } from "../base/entities/ValueObject";
import { UnsupportedArgumentValueError } from "../base/error/UnsupportedArgumentValueError";
import { CategoriesEnum } from "../enum/CategoriesEnum";

export interface CategoryProps {
  name: CategoriesEnum;
}

export class Category extends ValueObject<CategoryProps> {
  constructor(props: CategoryProps) {
    super({
      ...props,
    });

    this.validateName();
  }

  get name() {
    return this.props.name;
  }

  private validateName(): void {
    if (!Object.values(CategoriesEnum).includes(this.name)) {
      throw new UnsupportedArgumentValueError(
        `Invalid Category: ${this.name}. Accepted values are ${Object.values(
          CategoriesEnum
        ).join(", ")}`
      );
    }
  }
}
