import { ValueObject } from "../base/entities/ValueObject";
import { UnsupportedArgumentValueError } from "../base/error/UnsupportedArgumentValueError";
import { NotificationStatusEnum } from "../enum/NotificationStatusEnum";

export interface NotificationStatusProps {
  name: NotificationStatusEnum;
}

export class NotificationStatus extends ValueObject<NotificationStatusProps> {
  constructor(props: NotificationStatusProps) {
    super({
      ...props,
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!Object.values(NotificationStatusEnum).includes(props.name as any)) {
      throw new UnsupportedArgumentValueError(NotificationStatus.name);
    }
  }

  get name() {
    return this.props.name;
  }

  set name(value: NotificationStatusEnum) {
    this.props.name = value;
  }
}
