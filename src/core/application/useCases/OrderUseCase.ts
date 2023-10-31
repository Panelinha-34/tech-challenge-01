/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { UnsupportedArgumentValueError } from "@/core/domain/base/error/UnsupportedArgumentValueError";
import { Client } from "@/core/domain/entities/Client";
import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderComboItemList } from "@/core/domain/entities/OrderComboItemList";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { OrderProductItemList } from "@/core/domain/entities/OrderProductItemList";
import { Product } from "@/core/domain/entities/Product";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { PaymentMethodEnum } from "@/core/domain/enum/PaymentMethodEnum";
import { PaymentStatusEnum } from "@/core/domain/enum/PaymentStatusEnum";
import { IClientRepository } from "@/core/domain/repositories/IClientRepository";
import { IComboRepository } from "@/core/domain/repositories/IComboRepository";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { Category } from "@/core/domain/valueObjects/Category";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";
import { PaymentMethod } from "@/core/domain/valueObjects/PaymentMethod";

import { MinimumResourcesNotReached } from "./errors/MinimumResourcesNotReached";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { IComboUseCase } from "./IComboUseCase";
import { IOrderUseCase } from "./IOrderUseCase";
import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";
import {
  GetOrderByIdUseCaseRequestModel,
  GetOrderByIdUseCaseResponseModel,
} from "./model/order/GetOrderByIdUseCaseModel";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";
import {
  UpdateOrderStatusUseCaseRequestModel,
  UpdateOrderStatusUseCaseResponseModel,
} from "./model/order/UpdateOrderStatusUseCaseModel";

export class OrderUseCase implements IOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
    private productRepository: IProductRepository,
    private comboRepository: IComboRepository,

    private comboUseCase: IComboUseCase
  ) {}

  async getOrders({
    params,
    status,
    clientId,
  }: GetOrdersUseCaseRequestModel): Promise<GetOrdersUseCaseResponseModel> {
    if (
      status &&
      !Object.keys(OrderStatusEnum)
        .map((e) => e.toLowerCase())
        .includes(status.toLowerCase())
    ) {
      throw new UnsupportedArgumentValueError(Category.name);
    }

    if (clientId) {
      const client = await this.clientRepository.findById(clientId);

      if (!client) {
        throw new ResourceNotFoundError(Client.name);
      }
    }

    const orderStatus = status
      ? new OrderStatus({ name: status as OrderStatusEnum })
      : undefined;

    const paginationResponse = await this.orderRepository.findMany(
      params,
      orderStatus,
      clientId
    );

    return { paginationResponse };
  }

  async getOrderById({
    id,
  }: GetOrderByIdUseCaseRequestModel): Promise<GetOrderByIdUseCaseResponseModel> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new ResourceNotFoundError(Order.name);
    }

    const orderProducts = order.products.getItems();
    const products = await this.productRepository.findManyByIds(
      orderProducts.map((p) => p.productId.toString())
    );

    const orderCombos = order.combos.getItems();
    const combos = await this.comboRepository.findManyByIds(
      orderCombos.map((c) => c.comboId.toString())
    );

    return {
      order,
      orderProducts,
      orderCombos,
      products,
      combos,
    };
  }

  async createOrder({
    clientId,
    visitorName,
    combos,
    products,
    paymentMethod,
    paymentDetails,
    paymentStatus,
  }: CreateOrderUseCaseRequestModel): Promise<CreateOrderUseCaseResponseModel> {
    if (
      paymentMethod &&
      !Object.keys(PaymentMethodEnum)
        .map((e) => e.toLowerCase())
        .includes(paymentMethod.toLowerCase())
    ) {
      throw new UnsupportedArgumentValueError(PaymentMethod.name);
    }

    if (!clientId && !visitorName) {
      throw new MinimumResourcesNotReached(Client.name, [
        "clientId",
        "visitorName",
      ]);
    }

    if (clientId) {
      const client = await this.clientRepository.findById(clientId);

      if (!client) {
        throw new ResourceNotFoundError(Client.name);
      }
    }

    let allProductIds: string[] = [];

    if (products) {
      allProductIds = products.map((p) => p.id);
    }

    if (combos) {
      const allComboProductIds = combos
        .map((c) => {
          const { sandwichId, dessertId, sideId, drinkId } = c;

          return [sandwichId, dessertId, sideId, drinkId];
        })
        .flat()
        .filter((p): p is string => !!p);

      allProductIds = [...allProductIds, ...allComboProductIds];
    }

    const productDetails =
      await this.productRepository.findManyByIds(allProductIds);

    const notFoundedProductsIds = allProductIds
      .filter((p) => !productDetails.find((pd) => pd.id.toString() === p))
      .map((p) => p.toString());

    if (notFoundedProductsIds.length) {
      throw new ResourceNotFoundError(Product.name, notFoundedProductsIds);
    }

    let createdCombos: {
      combo: Combo;
      calculatedPrice: number;
      annotation?: string;
      quantity: number;
    }[] = [];

    if (combos) {
      try {
        const createdCombosPromises = combos.map(async (comboToCreate) => {
          const { sandwichId, dessertId, sideId, drinkId } = comboToCreate;

          const { combo } = await this.comboUseCase.createCombo({
            sandwichId,
            dessertId,
            sideId,
            drinkId,
          });

          return {
            combo,
            calculatedPrice: combo.price * comboToCreate.quantity,
            annotation: comboToCreate.annotation,
            quantity: comboToCreate.quantity,
          };
        });

        createdCombos = await Promise.all(createdCombosPromises);
      } catch (error) {
        for (const createdCombo of createdCombos) {
          await this.comboUseCase.deleteCombo({
            id: createdCombo.combo.id.toString(),
          });
        }
        throw error;
      }
    }

    const productsTotalPrice =
      products?.reduce((acc, product) => {
        const productDetail = productDetails.find(
          (pd) => pd.id.toString() === product.id
        );

        if (!productDetail) {
          throw new ResourceNotFoundError(Product.name);
        }

        return acc + productDetail.price * product.quantity;
      }, 0) ?? 0;

    const combosTotalPrice = createdCombos.reduce(
      (acc, combo) => acc + combo.calculatedPrice,
      0
    );

    const totalPrice = productsTotalPrice + combosTotalPrice;

    const order = new Order({
      status: new OrderStatus({
        name:
          PaymentStatusEnum.PAID === paymentStatus
            ? OrderStatusEnum.PAID
            : OrderStatusEnum.PENDING_PAYMENT,
      }),
      clientId: clientId ? new UniqueEntityId(clientId) : undefined,
      paymentMethod: new PaymentMethod({
        name: paymentMethod as PaymentMethodEnum,
      }),
      paymentDetails,
      visitorName,
      totalPrice,
    });

    const orderProductsToCreate =
      products?.map(
        (product) =>
          new OrderProductItem({
            productId: new UniqueEntityId(product.id),
            annotation: product.annotation,
            orderId: order.id,
            quantity: product.quantity,
            totalPrice:
              (productDetails.find((pd) => pd.id.toString() === product.id)
                ?.price || 0) * product.quantity,
          })
      ) ?? [];

    const orderCombosToCreate = createdCombos.map(
      (combo) =>
        new OrderComboItem({
          comboId: combo.combo.id,
          annotation: combo.annotation,
          orderId: order.id,
          quantity: combo.quantity,
          totalPrice: combo.calculatedPrice,
        })
    );

    order.products = new OrderProductItemList(orderProductsToCreate);
    order.combos = new OrderComboItemList(orderCombosToCreate);

    const createdOrder = await this.orderRepository.create(order);

    return { order: createdOrder };
  }

  async updateOrderStatus(
    props: UpdateOrderStatusUseCaseRequestModel
  ): Promise<UpdateOrderStatusUseCaseResponseModel> {
    const { id, status } = props;

    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new ResourceNotFoundError(Order.name);
    }

    order.status = new OrderStatus({
      name: status as OrderStatusEnum,
    });

    const updatedOrder = await this.orderRepository.update(order);

    return { order: updatedOrder };
  }
}
