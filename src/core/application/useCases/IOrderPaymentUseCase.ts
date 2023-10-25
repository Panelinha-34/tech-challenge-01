import {
    CreateOrderPaymentUseCaseRequestModel,
    CreateOrderPaymentUseCaseResponseModel,
  } from "./model/orderPayment/CreateOrderPaymentUseCaseModel";
  
  export interface IOrderPaymentUseCase {
    createOrderPayment(
      props: CreateOrderPaymentUseCaseRequestModel
    ): Promise<CreateOrderPaymentUseCaseResponseModel>;
  }
  