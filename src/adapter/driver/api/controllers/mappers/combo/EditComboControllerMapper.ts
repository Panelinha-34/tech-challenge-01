import { FastifyReply, FastifyRequest } from "fastify";

import {
  EditComboUseCaseRequestModel,
  EditComboUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/EditComboUseCaseModel";

import {
  editComboPathParametersSchema,
  editComboPayloadSchema,
} from "../../model/combo/EditComboControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class EditComboControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      EditComboUseCaseRequestModel,
      EditComboUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): EditComboUseCaseRequestModel {
    const { id } = editComboPathParametersSchema.parse(req.params);
    const { name, description, sandwichId, drinkId, sideId, dessertId } =
      editComboPayloadSchema.parse(req.body);

    return {
      id,
      name,
      description,
      sandwichId,
      drinkId,
      sideId,
      dessertId,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: EditComboUseCaseResponseModel
  ) {
    const products = useCaseResponseModel.productDetails.map((product) => ({
      id: product.id.toString(),
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category.name,
      createdAt: product.createdAt.toISOString(),
      updatedAt: product.updatedAt?.toISOString(),
    }));

    const combo = {
      id: useCaseResponseModel.combo.id.toString(),
      name: useCaseResponseModel.combo.name,
      description: useCaseResponseModel.combo.description,
      price: useCaseResponseModel.combo.price,
      createdAt: useCaseResponseModel.combo.createdAt.toISOString(),
      updatedAt: useCaseResponseModel.combo.updatedAt?.toISOString(),
      products,
    };

    return res.status(200).send(combo);
  }
}
