import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetCategoryByIdUseCaseRequestModel,
  GetCategoryByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/category/GetCategoryByIdUseCaseModel";

import { getCategoryByIdQueryParamsSchema } from "../../model/category/GetCategoryByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetCategoryByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetCategoryByIdUseCaseRequestModel,
      GetCategoryByIdUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetCategoryByIdUseCaseRequestModel {
    const { id } = getCategoryByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetCategoryByIdUseCaseResponseModel
  ) {
    const category = {
      id: useCaseResponseModel.category.id.toString(),
      name: useCaseResponseModel.category.name,
      createdAt: useCaseResponseModel.category.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.category.updatedAt?.toISOString(),
    };

    return res.status(200).send(category);
  }
}
