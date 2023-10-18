import { ValueObject } from "../base/entities/ValueObject";

export interface TaxvatProps {
  number: string;
}

export class Taxvat extends ValueObject<TaxvatProps> {
  constructor(props: TaxvatProps) {
    super({
      ...props,
    });
  }

  get number() {
    return this.props.number;
  }
}
