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
      throw new UnsupportedArgumentValueError(OrderStatus.name);
    }
  }

  get name() {
    return this.props.name;
  }

  set name(value: OrderStatusEnum) {
    this.isValidStatusTransition(this.name, value);

    this.props.name = value;
  }

  isValidStatusTransition(
    currentStatus: OrderStatusEnum,
    newStatus: OrderStatusEnum
  ): void {
    const orderStatusOrder: OrderStatusEnum[] = [
      OrderStatusEnum.PENDING_PAYMENT,
      OrderStatusEnum.PAID,
      OrderStatusEnum.IN_PREPARATION,
      OrderStatusEnum.READY,
      OrderStatusEnum.DELIVERED,
      OrderStatusEnum.COMPLETED,
      OrderStatusEnum.CANCELLED,
    ];

    const currentIndex = orderStatusOrder.indexOf(currentStatus);
    const newIndex = orderStatusOrder.indexOf(newStatus);

    if (currentIndex === -1 || newIndex === -1) {
      throw new UnsupportedArgumentValueError(OrderStatus.name);
    }

    if (newIndex < currentIndex) {
      throw new UnsupportedArgumentValueError(OrderStatus.name);
    }
  }
}
