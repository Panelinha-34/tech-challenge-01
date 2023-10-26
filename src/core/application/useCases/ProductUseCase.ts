import { UnsupportedArgumentValueError } from "@/core/domain/base/error/UnsupportedArgumentValueError";
import { Product } from "@/core/domain/entities/Product";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { Category } from "@/core/domain/valueObjects/Category";

import { AttributeConflictError } from "./errors/AttributeConflictError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { IProductUseCase } from "./IProductUseCase";
import {
  CreateProductUseCaseRequestModel,
  CreateProductUseCaseResponseModel,
} from "./model/product/CreateProductUseCaseModel";
import {
  EditProductUseCaseRequestModel,
  EditProductUseCaseResponseModel,
} from "./model/product/EditProductUseCaseModel";
import {
  GetProductByIdUseCaseRequestModel,
  GetProductByIdUseCaseResponseModel,
} from "./model/product/GetProductByIdUseCaseModel";
import {
  GetProductsByCategoryUseCaseRequestModel,
  GetProductsByCategoryUseCaseResponseModel,
} from "./model/product/GetProductsByCategoryUseCaseModel";
import {
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "./model/product/GetProductsUseCaseModel";

export class ProductUseCase implements IProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async getProducts({
    params,
  }: GetProductsUseCaseRequestModel): Promise<GetProductsUseCaseResponseModel> {
    const products = await this.productRepository.findMany(params);

    return { products };
  }

  async getProductById({
    id,
  }: GetProductByIdUseCaseRequestModel): Promise<GetProductByIdUseCaseResponseModel> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError("product");
    }

    return { product };
  }

  async getProductsByCategory({
    category,
  }: GetProductsByCategoryUseCaseRequestModel): Promise<GetProductsByCategoryUseCaseResponseModel> {
    const categories = Object.keys(CategoriesEnum).map((enumCategory) =>
      enumCategory.toLowerCase()
    );

    if (!categories.includes(category.toLowerCase())) {
      throw new UnsupportedArgumentValueError("category");
    }

    const products = await this.productRepository.findManyByCategory(
      new Category({ name: category.toUpperCase() as CategoriesEnum })
    );

    return { products };
  }

  async createProduct({
    category,
    description,
    name,
    price,
  }: CreateProductUseCaseRequestModel): Promise<CreateProductUseCaseResponseModel> {
    const hasProductWithSameName =
      await this.productRepository.findByName(name);

    if (hasProductWithSameName) {
      throw new AttributeConflictError("name", "product");
    }

    const product = await this.productRepository.create(
      new Product({
        name,
        price,
        category: new Category({ name: category as CategoriesEnum }),
        description,
      })
    );

    return { product };
  }

  async editProduct({
    id,
    name,
    category,
    description,
    price,
  }: EditProductUseCaseRequestModel): Promise<EditProductUseCaseResponseModel> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError("product");
    }

    if (name) {
      const hasProductWithSameName =
        await this.productRepository.findByName(name);

      if (
        hasProductWithSameName &&
        hasProductWithSameName.id.toString() !== product.id.toString()
      ) {
        throw new AttributeConflictError("name", "product");
      }

      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (category) {
      product.category = new Category({ name: category as CategoriesEnum });
    }

    if (price) {
      product.price = price;
    }

    const updatedProduct = await this.productRepository.update(product);

    return { product: updatedProduct };
  }
}
