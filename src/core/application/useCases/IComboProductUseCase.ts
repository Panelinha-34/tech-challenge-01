import {
  CreateComboProductUseCaseRequestModel,
  CreateComboProductUseCaseResponseModel
} from "./model/comboProduct/CreateComboProductUseCaseModel";
import { DeleteComboProductUseCaseRequestModel } from './model/comboProduct/DeleteComboProductUseCaseModel';
import {
  GetComboProductsUseCaseRequestModel,
  GetComboProductsUseCaseResponseModel
} from "./model/comboProduct/GetComboProductsUseCaseModel";

export interface IComboProductUseCase {
  getComboProducts(
    props: GetComboProductsUseCaseRequestModel
  ): Promise<GetComboProductsUseCaseResponseModel>;
  
  createComboProduct(
    props: CreateComboProductUseCaseRequestModel
  ): Promise<CreateComboProductUseCaseResponseModel>;

  deleteComboProduct(
    props: DeleteComboProductUseCaseRequestModel
  ): Promise<void>;
}
