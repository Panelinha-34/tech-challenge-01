import { ValueObject } from "../base/entities/ValueObject";
import { UnsupportedArgumentValueError } from "../base/error/UnsupportedArgumentValueError";
import { OrderStatusEnum } from "../enum/OrderStatusEnum";

export interface OrderStatusProps {
  name: OrderStatusEnum;
}

export class OrderStatus extends ValueObject<OrderStatusProps> {
  constructor(props: OrderStatusProps) {
    super({
      ...props,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Object.values(OrderStatusEnum).includes(props.name as any)) {
      throw new UnsupportedArgumentValueError("order_status");
    }
  }

  get name() {
    return this.props.name;
  }
}
