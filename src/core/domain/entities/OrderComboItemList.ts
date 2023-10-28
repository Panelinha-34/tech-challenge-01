import { WatchedList } from "../base/entities/WatchedList";
import { OrderComboItem } from "./OrderComboItem";

export class OrderComboItemList extends WatchedList<OrderComboItem> {
  compareItems(a: OrderComboItem, b: OrderComboItem): boolean {
    return a.comboId.equals(b.comboId);
  }
}
