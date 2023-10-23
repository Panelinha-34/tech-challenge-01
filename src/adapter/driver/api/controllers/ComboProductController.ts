import { FastifyReply, FastifyRequest } from "fastify";

import { IComboProductUseCase } from '@/core/application/useCases/IComboProductUseCase';
import { GetComboProductsControllerMapper } from './mappers/comboProduct/GetComboProductsControllerMapper';
import { CreateComboProductControllerMapper } from './mappers/comboProduct/CreateComboProductControllerMapper';
import { GetComboProductsControllerResponse } from './model/comboProduct/GetComboProductsControllerModel';
import { DeleteComboProductControllerMapper } from './mappers/comboProduct/DeleteComboProductControllerMapper';

export class ComboProductController {
  constructor(
    private comboProductUseCase: IComboProductUseCase,

    private getComboProductsControllerMapper: GetComboProductsControllerMapper,
    private createComboProductControllerMapper: CreateComboProductControllerMapper,
    private deleteComboProductControllerMapper: DeleteComboProductControllerMapper,
  ) {}

  async getComboProducts(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetComboProductsControllerResponse> {
    return this.comboProductUseCase
      .getComboProducts(this.getComboProductsControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.getComboProductsControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getComboProductsControllerMapper.convertErrorResponse(error, res)
      );
  }

  async createComboProduct(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.comboProductUseCase
      .createComboProduct(this.createComboProductControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.createComboProductControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.createComboProductControllerMapper.convertErrorResponse(error, res)
      );
  }

  async deleteComboProduct(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.comboProductUseCase
      .deleteComboProduct(this.deleteComboProductControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.deleteComboProductControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.deleteComboProductControllerMapper.convertErrorResponse(error, res)
      );
  }
}
