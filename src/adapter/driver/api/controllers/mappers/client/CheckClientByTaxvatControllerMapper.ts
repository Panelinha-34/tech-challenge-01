import { FastifyReply, FastifyRequest } from "fastify";

import {
  CheckClientByTaxvatUseCaseRequestModel,
  CheckClientByTaxvatUseCaseResponseModel,
} from "@/core/application/useCases/model/client/CheckClientByTaxvatUseCaseModel";

import {
  CheckClientByTaxvatControllerResponse,
  checkClientByTaxvatQueryParamsSchema,
} from "../../model/client/CheckClientByTaxvatControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CheckClientByTaxvatControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CheckClientByTaxvatUseCaseRequestModel,
      CheckClientByTaxvatUseCaseResponseModel,
      CheckClientByTaxvatControllerResponse
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): CheckClientByTaxvatUseCaseRequestModel {
    const { taxvat } = checkClientByTaxvatQueryParamsSchema.parse(req.query);

    return {
      taxvat,
    };
  }

  convertUseCaseModelToControllerResponse({
    exist,
  }: CheckClientByTaxvatUseCaseResponseModel): CheckClientByTaxvatControllerResponse {
    return {
      exist,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    useCaseResponseModel: CheckClientByTaxvatUseCaseResponseModel
  ) {
    const client =
      this.convertUseCaseModelToControllerResponse(useCaseResponseModel);

    return res.status(200).send(client);
  }
}
