import { FastifyReply, FastifyRequest } from "fastify";

import {
  EditCategoryUseCaseRequestModel,
  EditCategoryUseCaseResponseModel,
} from "@/core/application/useCases/model/category/EditCategoryUseCaseModel";

import {
  editCategoryPathParametersSchema,
  editCategoryPayloadSchema,
} from "../../model/category/EditCategoryControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class EditCategoryControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      EditCategoryUseCaseRequestModel,
      EditCategoryUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): EditCategoryUseCaseRequestModel {
    const { id } = editCategoryPathParametersSchema.parse(req.params);
    const { name } = editCategoryPayloadSchema.parse(req.body);

    return {
      id,
      name,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: EditCategoryUseCaseResponseModel
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
