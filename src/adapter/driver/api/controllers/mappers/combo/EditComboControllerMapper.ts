import { FastifyReply, FastifyRequest } from "fastify";

import { MinimumResourcesNotReached } from "@/core/application/useCases/errors/MinimumResourcesNotReached";
import {
  EditComboUseCaseRequestModel,
  EditComboUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/EditComboUseCaseModel";

import {
  EditComboControllerResponse,
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
      EditComboUseCaseResponseModel,
      EditComboControllerResponse
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

  convertUseCaseModelToControllerResponse(
    model: EditComboUseCaseResponseModel
  ): EditComboControllerResponse {
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
    useCaseResponseModel: EditComboUseCaseResponseModel
  ) {
    return res
      .status(200)
      .send(this.convertUseCaseModelToControllerResponse(useCaseResponseModel));
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
