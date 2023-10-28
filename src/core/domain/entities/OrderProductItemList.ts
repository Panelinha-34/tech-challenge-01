import { WatchedList } from "../base/entities/WatchedList";
import { OrderProductItem } from "./OrderProductItem";

export class OrderProductItemList extends WatchedList<OrderProductItem> {
  compareItems(a: OrderProductItem, b: OrderProductItem): boolean {
    return a.productId.equals(b.productId);
  }
}
