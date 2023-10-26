/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from "fastify";

import {
  CreateProductUseCaseRequestModel,
  CreateProductUseCaseResponseModel,
} from "@/core/application/useCases/model/product/CreateProductUseCaseModel";

import {
  CreateProductControllerResponse,
  createProductPayloadSchema,
} from "../../model/product/CreateProductControllerModel";
import { ErrorHandlingMapper } from "../base/ErrorHandlingMapper";
import { IControllerMapper } from "../base/IControllerMapper";

export class CreateProductControllerMapper
  extends ErrorHandlingMapper
  implements
    IControllerMapper<
      CreateProductUseCaseRequestModel,
      CreateProductUseCaseResponseModel,
      CreateProductControllerResponse
    >
{
  convertRequestModel(req: FastifyRequest): CreateProductUseCaseRequestModel {
    const { name, description, price, category } =
      createProductPayloadSchema.parse(req.body);

    return {
      name,
      description,
      price,
      category,
    };
  }

  convertSuccessfullyResponse(
    res: FastifyReply,
    _useCaseResponseModel: CreateProductUseCaseResponseModel
  ) {
    return res.status(201).send();
  }
}
