import { FastifyReply, FastifyRequest } from "fastify";

import {
  EditProductUseCaseRequestModel,
  EditProductUseCaseResponseModel,
} from "@/core/application/useCases/model/product/EditProductUseCaseModel";

import {
  EditProductControllerResponse,
  editProductPathParametersSchema,
  editProductPayloadSchema,
} from "../../model/product/EditProductControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class EditProductControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      EditProductUseCaseRequestModel,
      EditProductUseCaseResponseModel,
      EditProductControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): EditProductUseCaseRequestModel {
    const { id } = editProductPathParametersSchema.parse(req.params);
    const { name, category, description, price } =
      editProductPayloadSchema.parse(req.body);

    return {
      id,
      name,
      category,
      description,
      price,
    };
  }

  convertUseCaseModelToControllerResponse(
    model: EditProductUseCaseResponseModel
  ): EditProductControllerResponse {
    return {
      id: model.product.id.toString(),
      name: model.product.name,
      description: model.product.description,
      price: model.product.price,
      category: model.product.category.name,
      createdAt: model.product.createdAt.toISOString(),
      updatedAt: model.product.updatedAt?.toISOString(),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: EditProductUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
  }
}
