import { FastifyReply, FastifyRequest } from "fastify";

import { ICategoryUseCase } from "@/core/application/useCases/ICategoryUseCase";

import { CreateCategoryControllerMapper } from "./mappers/category/CreateCategoryControllerMapper";
import { EditCategoryControllerMapper } from "./mappers/category/EditCategoryControllerMapper";
import { GetCategoriesControllerMapper } from "./mappers/category/GetCategoriesControllerMapper";
import { GetCategoryByIdControllerMapper } from "./mappers/category/GetCategoryByIdControllerMapper";
import { GetCategoriesControllerResponse } from "./model/category/GetCategoriesControllerModel";
import { GetCategoryByIdControllerResponse } from "./model/category/GetCategoryByIdControllerModel";

export class CategoryController {
  constructor(
    private categoryUseCase: ICategoryUseCase,

    private getCategoriesControllerMapper: GetCategoriesControllerMapper,
    private getCategoryByIdControllerMapper: GetCategoryByIdControllerMapper,
    private createCategoryControllerMapper: CreateCategoryControllerMapper,
    private editCategoryControllerMapper: EditCategoryControllerMapper
  ) {}

  async getCategories(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetCategoriesControllerResponse> {
    return this.categoryUseCase
      .getCategories(
        this.getCategoriesControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getCategoriesControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getCategoriesControllerMapper.convertErrorResponse(error, res)
      );
  }

  async getCategoryById(
    req: FastifyRequest,
    res: FastifyReply
  ): Promise<GetCategoryByIdControllerResponse> {
    return this.categoryUseCase
      .getCategoryById(
        this.getCategoryByIdControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getCategoryByIdControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getCategoryByIdControllerMapper.convertErrorResponse(error, res)
      );
  }

  async createCategory(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.categoryUseCase
      .createCategory(
        this.createCategoryControllerMapper.convertRequestModel(req)
      )
      .then((response) =>
        this.getCategoryByIdControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.getCategoryByIdControllerMapper.convertErrorResponse(error, res)
      );
  }

  async editCategory(req: FastifyRequest, res: FastifyReply): Promise<void> {
    return this.categoryUseCase
      .editCategory(this.editCategoryControllerMapper.convertRequestModel(req))
      .then((response) =>
        this.editCategoryControllerMapper.convertSuccessfullyResponse(
          res,
          response
        )
      )
      .catch((error) =>
        this.editCategoryControllerMapper.convertErrorResponse(error, res)
      );
  }
}
