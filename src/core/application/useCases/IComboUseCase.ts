import {
  CreateComboUseCaseRequestModel,
  CreateComboUseCaseResponseModel,
} from "./model/combo/CreateComboUseCaseModel";
import {
  EditComboUseCaseRequestModel,
  EditComboUseCaseResponseModel,
} from "./model/combo/EditComboUseCaseModel";
import {
  GetComboByIdUseCaseRequestModel,
  GetComboByIdUseCaseResponseModel,
} from "./model/combo/GetComboByIdUseCaseModel";
import {
  GetCombosUseCaseRequestModel,
  GetCombosUseCaseResponseModel,
} from "./model/combo/GetCombosUseCaseModel";

export interface IComboUseCase {
  getCombos(
    props: GetCombosUseCaseRequestModel
  ): Promise<GetCombosUseCaseResponseModel>;

  getComboById(
    props: GetComboByIdUseCaseRequestModel
  ): Promise<GetComboByIdUseCaseResponseModel>;

  createCombo(
    props: CreateComboUseCaseRequestModel
  ): Promise<CreateComboUseCaseResponseModel>;

  editCombo(
    props: EditComboUseCaseRequestModel
  ): Promise<EditComboUseCaseResponseModel>;
}
