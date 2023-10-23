import { Product } from "@/core/domain/entities/Product";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";

import { AttributeConflictError } from "./errors/AttributeConflictError";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { IProductUseCase } from "./IProductUseCase";
import {
  CreateProductUseCaseRequestModel,
  CreateProductUseCaseResponseModel,
} from "./model/product/CreateProductUseCaseModel";
import {
  EditClientUseCaseRequestModel,
  EditClientUseCaseResponseModel,
} from "./model/client/EditClientUseCaseModel";
import {
  GetClientsUseCaseRequestModel,
  GetClientsUseCaseResponseModel,
} from "./model/client/GetClientsUseCaseModel";
import {
  GetProductsUseCaseRequestModel,
  GetProductsUseCaseResponseModel,
} from "./model/product/GetProductsUseCaseModel";
import {
  GetProductByIdUseCaseRequestModel,
  GetProductByIdUseCaseResponseModel,
} from "./model/product/GetProductByIdUseCaseModel";
import {
  EditProductUseCaseRequestModel,
  EditProductUseCaseResponseModel,
} from "./model/product/EditProductUseCaseModel";

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

  async createProduct({
    categoryId,
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
        categoryId,
        description,
      })
    );

    return { product };
  }

  async editProduct({
    id,
    name,
    categoryId,
    description,
    price,
  }: EditProductUseCaseRequestModel): Promise<EditProductUseCaseResponseModel> {
    const product = await this.productRepository.findById(id);

    if (!product) {
      throw new ResourceNotFoundError("product");
    }

    if (name) {
      product.name = name;
    }

    if (description) {
      product.description = description;
    }

    if (categoryId) {
      product.categoryId = categoryId;
    }

    if (price) {
      product.price = price;
    }

    const updatedProduct = await this.productRepository.update(product);

    return { product: updatedProduct };
  }
}
