import { FastifyReply, FastifyRequest } from "fastify";

import {
  EditProductUseCaseRequestModel,
  EditProductUseCaseResponseModel,
} from "@/core/application/useCases/model/product/EditProductUseCaseModel";

import {
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
      EditProductUseCaseResponseModel
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

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: EditProductUseCaseResponseModel
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
