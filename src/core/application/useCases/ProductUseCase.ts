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
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "./model/product/GetProductsUseCaseModel";
import {
  InactiveProductUseCaseRequestModel,
  InactiveProductUseCaseResponseModel,
} from "./model/product/InactiveProductUseCaseModel";

export class ProductUseCase implements IProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async getProducts({
    params,
    category,
  }: GetProductsUseCaseRequestModel): Promise<GetProductsUseCaseResponseModel> {
    if (
      category &&
      !Object.keys(CategoriesEnum)
        .map((e) => e.toLowerCase())
        .includes(category.toLowerCase())
    ) {
      throw new UnsupportedArgumentValueError(Category.name);
    }

    const productCategory = category
      ? new Category({ name: category as CategoriesEnum })
      : undefined;

    const paginationResponse = await this.productRepository.findMany(
      params,
      productCategory
    );

    return { paginationResponse };
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

  async createProduct({
    category,
    description,
    name,
    price,
  }: CreateProductUseCaseRequestModel): Promise<CreateProductUseCaseResponseModel> {
    const hasProductWithSameName =
      await this.productRepository.findByName(name);

    if (hasProductWithSameName) {
      throw new AttributeConflictError<Product>("name", Product.name);
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

  async inactiveProduct(
    props: InactiveProductUseCaseRequestModel
  ): Promise<InactiveProductUseCaseResponseModel> {
    const { id } = props;

    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError(Product.name);
    }

    product.active = false;

    const updatedProduct = await this.productRepository.update(product);

    return { product: updatedProduct };
  }
}
