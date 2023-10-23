import { FastifyReply, FastifyRequest } from "fastify";

import { IComboUseCase } from "@/core/application/useCases/IComboUseCase";

import { GetCombosControllerMapper } from "./mappers/combo/GetCombosControllerMapper";
import { GetComboByIdControllerMapper } from "./mappers/combo/GetComboByIdControllerMapper";
import { CreateComboControllerMapper } from "./mappers/combo/CreateComboControllerMapper";
import { EditComboControllerMapper } from "./mappers/combo/EditComboControllerMapper";
import { GetCombosControllerResponse } from "./model/combo/GetCombosControllerModel";
import { GetComboByIdControllerResponse } from "./model/combo/GetComboByIdControllerModel";

export class ComboController {
  constructor(
    private comboUseCase: IComboUseCase,

    private getCombosControllerMapper: GetCombosControllerMapper,
    private getComboByIdControllerMapper: GetComboByIdControllerMapper,
    private createComboControllerMapper: CreateComboControllerMapper,
    private editComboControllerMapper: EditComboControllerMapper
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

  async createCombo(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.comboUseCase
      .createCombo(this.createComboControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.createComboControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createComboControllerMapper.convertErrorResponse(error, res)
      );
  }

  async editCombo(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.comboUseCase
      .editCombo(this.editComboControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.editComboControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.editComboControllerMapper.convertErrorResponse(error, res)
      );
  }
}
