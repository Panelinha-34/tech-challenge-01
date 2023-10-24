import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateProductUseCaseRequestModel,
  CreateProductUseCaseResponseModel,
} from "@/core/application/useCases/model/product/CreateProductUseCaseModel";

import { createProductPayloadSchema } from "../../model/product/CreateProductControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateProductControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateProductUseCaseRequestModel,
      CreateProductUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateProductUseCaseRequestModel {
    const { name, description, price, category } =
      createProductPayloadSchema.parse(req.body);

    return {
      name,
      description,
      price,
      category,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateProductUseCaseResponseModel
  ) {
    const product = {
      id: useCaseResponseModel.product.id.toString(),
      name: useCaseResponseModel.product.name,
      description: useCaseResponseModel.product.description,
      price: useCaseResponseModel.product.price,
      category: useCaseResponseModel.product.category.name,
      createdAt: useCaseResponseModel.product.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.product.updatedAt?.toISOString(),
    };

    return res.status(200).send(product);
  }
}
