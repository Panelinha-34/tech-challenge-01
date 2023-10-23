import { AttributeConflictError } from '@/core/application/useCases/errors/AttributeConflictError';
import { PaginationParams } from "@/core/domain/base/PaginationParams";
import { ComboProduct } from '@/core/domain/entities/ComboProduct';
import { IComboProductRepository } from '@/core/domain/repositories/IComboProductRepository';

export class InMemoryComboProductRepository implements IComboProductRepository {
  public items: ComboProduct[] = [];

  async findByProductIdAndComboId(productId: string, comboId: string): Promise<ComboProduct | null> {
    const foundComboProduct = this.items.find((comboProduct) =>
      comboProduct.productId.toString() === productId && 
        comboProduct.comboId.toString() === comboId
    )

    return foundComboProduct || null;
  }

  delete(comboProduct: ComboProduct): Promise<ComboProduct> {
    throw new Error('Method not implemented.');
  }

  async findMany({ page, size }: PaginationParams): Promise<ComboProduct[]> {
    const combos = this.items.slice((page - 1) * size, page * size);

    return combos;
  }

  async create(combo: ComboProduct): Promise<ComboProduct> {
    this.items.push(combo);

    return combo;
  }
}
