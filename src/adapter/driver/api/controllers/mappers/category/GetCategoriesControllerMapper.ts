import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetCategoriesUseCaseRequestModel,
  GetCategoriesUseCaseResponseModel,
} from "@/core/application/useCases/model/category/GetCategoriesUseCaseModel";
import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getCategoriesQueryParamsSchema } from "../../model/category/GetCategoriesControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetCategoriesControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetCategoriesUseCaseRequestModel,
      GetCategoriesUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetCategoriesUseCaseRequestModel {
    const { page, pageSize } = getCategoriesQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetCategoriesUseCaseResponseModel
  ) {
    const categories = response.categories.map((category) => ({
      id: category.id.toString(),
      name: category.name,
      createdAt: category.createdAt.toISOString(),
      updatedAt: category.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ categories });
  }
}
