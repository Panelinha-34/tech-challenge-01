import {
  CreateComboProductUseCaseRequestModel,
  CreateComboProductUseCaseResponseModel
} from "./model/comboProduct/CreateComboProductUseCaseModel";
import { 
  GetComboProductsByComboIdUseCaseRequestModel, 
  GetComboProductsByComboIdUseCaseResponseModel 
} from './model/comboProduct/GetComboProductsByComboIdUseCaseModel';
import { 
  GetComboProductsByProductIdUseCaseRequestModel, 
  GetComboProductsByProductIdUseCaseResponseModel 
} from './model/comboProduct/GetComboProductsByProductIdUseCaseModel';
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
}
