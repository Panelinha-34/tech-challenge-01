import { FastifyReply, FastifyRequest } from "fastify";

import { MinimumResourcesNotReached } from "@/core/application/useCases/errors/MinimumResourcesNotReached";
import {
  CreateComboUseCaseRequestModel,
  CreateComboUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/CreateComboUseCaseModel";

import {
  CreateComboControllerResponse,
  createComboPayloadSchema,
} from "../../model/combo/CreateComboControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateComboControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateComboUseCaseRequestModel,
      CreateComboUseCaseResponseModel,
      CreateComboControllerResponse
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

  convertUseCaseModelToControllerResponse(
    model: CreateComboUseCaseResponseModel
  ): CreateComboControllerResponse {
    return {
      id: model.combo.id.toString(),
      name: model.combo.name,
      description: model.combo.description,
      price: model.combo.price,
      createdAt: model.combo.createdAt.toISOString(),
      updatedAt: model.combo.updatedAt?.toISOString(),
      products: model.productDetails.map((product) => ({
        id: product.id.toString(),
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category.name,
        createdAt: product.createdAt.toISOString(),
        updatedAt: product.updatedAt?.toISOString(),
      })),
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CreateComboUseCaseResponseModel
  ) {
    const combo =
      this.convertUseCaseModelToControllerResponse(useCaseResponseModel);
    return res.status(201).send(combo);
  }

  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply {
    if (error instanceof MinimumResourcesNotReached) {
      return res.status(400).send({
        message: `Please inform at least 1 product`,
      });
    }

    return super.convertErrorResponse(error, res);
  }
}
