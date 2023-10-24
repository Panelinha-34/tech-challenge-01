import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetProductByIdUseCaseRequestModel,
  GetProductByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/product/GetProductByIdUseCaseModel";

import { getProductByIdQueryParamsSchema } from "../../model/product/GetProductByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetProductByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetProductByIdUseCaseRequestModel,
      GetProductByIdUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetProductByIdUseCaseRequestModel {
    const { id } = getProductByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetProductByIdUseCaseResponseModel
  ) {
    const product = {
      id: useCaseResponseModel.product.id.toString(),
      name: useCaseResponseModel.product.name,
      price: useCaseResponseModel.product.price,
      description: useCaseResponseModel.product.description,
      category: useCaseResponseModel.product.category.name,
      createdAt: useCaseResponseModel.product.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.product.updatedAt?.toISOString(),
    };

    return res.status(200).send(product);
  }
}
