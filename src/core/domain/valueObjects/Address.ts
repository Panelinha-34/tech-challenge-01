import { ValueObject } from "../base/entities/ValueObject";

export interface AddressProps {
  street: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

export class Address extends ValueObject<AddressProps> {
  constructor(props: AddressProps) {
    super({
      ...props,
    });
  }

  get street() {
    return this.props.street;
  }

  get complement() {
    return this.props.complement;
  }

  get neighborhood() {
    return this.props.neighborhood;
  }

  get city() {
    return this.props.city;
  }

  get state() {
    return this.props.state;
  }

  get zipCode() {
    return this.props.zipCode;
  }
}
