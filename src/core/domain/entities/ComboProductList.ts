import { WatchedList } from "../base/entities/WatchedList";
import { ComboProduct } from "./ComboProduct";

export class ComboProductList extends WatchedList<ComboProduct> {
  compareItems(a: ComboProduct, b: ComboProduct): boolean {
    return a.productId.equals(b.productId);
  }
}
