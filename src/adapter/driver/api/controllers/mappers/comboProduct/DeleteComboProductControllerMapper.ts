import { FastifyReply, FastifyRequest } from "fastify";

import {
  DeleteComboProductUseCaseRequestModel
} from "@/core/application/useCases/model/comboProduct/DeleteComboProductUseCaseModel";

import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";
import { deleteComboProductByIdParametersSchema } from '../../model/comboProduct/DeleteComboProductControllerModel';

export class DeleteComboProductControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      DeleteComboProductUseCaseRequestModel,
      void
    >
{
  convertRequestModel(
    req: FastifyRequest
  ): DeleteComboProductUseCaseRequestModel {
    const { id } = deleteComboProductByIdParametersSchema.parse(
      req.params
    );

    return {
      id
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    _: void
  ) {
    return res.status(200).send();
  }
}
