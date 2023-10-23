import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateCategoryUseCaseRequestModel,
  CreateCategoryUseCaseResponseModel,
} from "@/core/application/useCases/model/category/CreateCategoryUseCaseModel";

import { createCategoryPayloadSchema } from "../../model/category/CreateCategoryControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateCategoryControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateCategoryUseCaseRequestModel,
      CreateCategoryUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateCategoryUseCaseRequestModel {
    const { name } = createCategoryPayloadSchema.parse(req.body);

    return {
      name,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateCategoryUseCaseResponseModel
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
