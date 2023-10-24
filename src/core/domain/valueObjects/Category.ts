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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Object.values(CategoriesEnum).includes(props.name as any)) {
      throw new UnsupportedArgumentValueError("category");
    }
  }

  get name() {
    return this.props.name;
  }
}
