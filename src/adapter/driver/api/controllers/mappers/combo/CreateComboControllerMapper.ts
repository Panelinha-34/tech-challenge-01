import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateComboUseCaseRequestModel,
  CreateComboUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/CreateComboUseCaseModel";

import { createComboPayloadSchema } from "../../model/combo/CreateComboControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateComboControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateComboUseCaseRequestModel,
      CreateComboUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): CreateComboUseCaseRequestModel {
    const { name, description, sandwichId, drinkId, sideId, dessertId } =
      createComboPayloadSchema.parse(req.body);

    return {
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
    useCaseResponseModel: CreateComboUseCaseResponseModel
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

    return res.status(201).send(combo);
  }
}
