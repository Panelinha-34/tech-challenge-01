import { FastifyReply, FastifyRequest } from "fastify";

import { IComboUseCase } from "@/core/application/useCases/IComboUseCase";

import { GetComboByIdControllerMapper } from "./mappers/combo/GetComboByIdControllerMapper";
import { GetCombosControllerMapper } from "./mappers/combo/GetCombosControllerMapper";
import { GetComboByIdControllerResponse } from "./model/combo/GetComboByIdControllerModel";
import { GetCombosControllerResponse } from "./model/combo/GetCombosControllerModel";

export class ComboController {
  constructor(
    private comboUseCase: IComboUseCase,

    private getCombosControllerMapper: GetCombosControllerMapper,
    private getComboByIdControllerMapper: GetComboByIdControllerMapper
  ) {}

  async getCombos(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetCombosControllerResponse> {
    return this.comboUseCase
      .getCombos(this.getCombosControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.getCombosControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getCombosControllerMapper.convertErrorResponse(error, res)
      );
  }

  async getComboById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetComboByIdControllerResponse> {
    return this.comboUseCase
      .getComboById(this.getComboByIdControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.getComboByIdControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getComboByIdControllerMapper.convertErrorResponse(error, res)
      );
  }
}
