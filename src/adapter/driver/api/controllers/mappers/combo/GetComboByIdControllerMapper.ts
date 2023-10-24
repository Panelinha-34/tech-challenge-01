import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetComboByIdUseCaseRequestModel,
  GetComboByIdUseCaseResponseModel,
} from "@/core/application/useCases/model/combo/GetComboByIdUseCaseModel";

import { getComboByIdQueryParamsSchema } from "../../model/combo/GetComboByIdControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetComboByIdControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetComboByIdUseCaseRequestModel,
      GetComboByIdUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetComboByIdUseCaseRequestModel {
    const { id } = getComboByIdQueryParamsSchema.parse(req.params);

    return {
      id,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: GetComboByIdUseCaseResponseModel
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
