import { FastifyReply, FastifyRequest } from "fastify";

import {
  GetComboProductsUseCaseRequestModel,
  GetComboProductsUseCaseResponseModel,
} from "@/core/application/useCases/model/comboProduct/GetComboProductsUseCaseModel";

import { PaginationParams } from "@/core/domain/base/PaginationParams";

import { getComboProductsQueryParamsSchema } from "../../model/comboProduct/GetComboProductsControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class GetComboProductsControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      GetComboProductsUseCaseRequestModel,
      GetComboProductsUseCaseResponseModel
    >
{
  convertRequestModel(req: FastifyRequest): GetComboProductsUseCaseRequestModel {
    const { page, pageSize } = getComboProductsQueryParamsSchema.parse(req.query);

    const params = new PaginationParams(page, pageSize);

    return {
      params,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    response: GetComboProductsUseCaseResponseModel
  ) {
    const comboProducts = response.comboProducts.map((comboProduct) => ({
      id: comboProduct.id.toString(),
      productId: comboProduct.productId,
      comboId: comboProduct.comboId,
      createdAt: comboProduct.createdAt.toISOString(),
      updatedAt: comboProduct.updatedAt?.toISOString(),
    }));

    return res.status(200).send({ comboProducts });
  }
}
