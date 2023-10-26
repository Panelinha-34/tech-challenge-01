import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetProductsByCategoryUseCaseRequestModel,
  GetProductsByCategoryUseCaseResponseModel,
} from "@/core/application/useCases/model/product/GetProductsByCategoryUseCaseModel";

import { getProductsByCategoryQueryParamsSchema } from "../../model/product/GetProductsByCategoryControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetProductsByCategoryControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetProductsByCategoryUseCaseRequestModel,
      GetProductsByCategoryUseCaseResponseModel
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): GetProductsByCategoryUseCaseRequestModel {
    const { category } = getProductsByCategoryQueryParamsSchema.parse(
      req.params
    );

    return {
      category,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetProductsByCategoryUseCaseResponseModel
  ) {
    const products = useCaseResponseModel.products.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category.name,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ products });
  }
}
