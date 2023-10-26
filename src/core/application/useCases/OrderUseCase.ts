import { Client } from "@/core/domain/entities/Client";
import { Combo } from "@/core/domain/entities/Combo";
import { Order } from "@/core/domain/entities/Order";
import { OrderComboItem } from "@/core/domain/entities/OrderComboItem";
import { OrderProductItem } from "@/core/domain/entities/OrderProductItem";
import { Product } from "@/core/domain/entities/Product";
import { OrderStatusEnum } from "@/core/domain/enum/OrderStatusEnum";
import { IClientRepository } from "@/core/domain/repositories/IClientRepository";
import { IOrderComboItemRepository } from "@/core/domain/repositories/IOrderComboItemRepository";
import { IOrderProductItemRepository } from "@/core/domain/repositories/IOrderProductItemRepository";
import { IOrderRepository } from "@/core/domain/repositories/IOrderRepository";
import { IProductRepository } from "@/core/domain/repositories/IProductRepository";
import { OrderStatus } from "@/core/domain/valueObjects/OrderStatus";

import { MinimumResourcesNotReached } from "./errors/MinimumComboProductsNotReached";
import { ResourceNotFoundError } from "./errors/ResourceNotFoundError";
import { IComboUseCase } from "./IComboUseCase";
import { IOrderUseCase } from "./IOrderUseCase";
import {
  CreateOrderUseCaseRequestModel,
  CreateOrderUseCaseResponseModel,
} from "./model/order/CreateOrderUseCaseModel";
import {
  GetOrdersUseCaseRequestModel,
  GetOrdersUseCaseResponseModel,
} from "./model/order/GetOrdersUseCaseModel";

export class OrderUseCase implements IOrderUseCase {
  constructor(
    private orderRepository: IOrderRepository,
    private clientRepository: IClientRepository,
    private productRepository: IProductRepository,
    private orderComboItemRepository: IOrderComboItemRepository,
    private orderProductItemRepository: IOrderProductItemRepository,

    private comboUseCase: IComboUseCase
  ) {}

  async getOrders({
    params,
  }: GetOrdersUseCaseRequestModel): Promise<GetOrdersUseCaseResponseModel> {
    const paginationResponse = await this.orderRepository.findMany(params);

    return { paginationResponse };
  }

  async createOrder({
    clientId,
    clientName,
    combos,
    products,
  }: CreateOrderUseCaseRequestModel): Promise<CreateOrderUseCaseResponseModel> {
    if (!clientId && !clientName) {
      throw new MinimumResourcesNotReached(Client.name, [
        "clientId",
        "clientName",
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

    const createdCombos: {
      combo: Combo;
      calculatedPrice: number;
      annotation?: string;
      quantity: number;
    }[] = [];

    if (combos) {
      try {
        combos.forEach(async (comboToCreate) => {
          const { sandwichId, dessertId, sideId, drinkId } = comboToCreate;

          const { combo } = await this.comboUseCase.createCombo({
            sandwichId,
            dessertId,
            sideId,
            drinkId,
          });

          createdCombos.push({
            combo,
            calculatedPrice: combo.price * comboToCreate.quantity,
            annotation: comboToCreate.annotation,
            quantity: comboToCreate.quantity,
          });
        });
      } catch (error) {
        createdCombos.forEach(async (createdCombo) => {
          await this.comboUseCase.deleteCombo({
            id: createdCombo.combo.id.toString(),
          });
        });

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
      status: new OrderStatus({ name: OrderStatusEnum.PENDING_PAYMENT }),
      clientId,
      clientName,
      totalPrice,
    });

    const createdOrder = await this.orderRepository.create(order);

    const orderCombosToCreate = createdCombos.map(
      (combo) =>
        new OrderComboItem({
          comboId: combo.combo.id.toString(),
          annotation: combo.annotation,
          orderId: createdOrder.id.toString(),
          quantity: combo.quantity,
          totalPrice: combo.calculatedPrice,
        })
    );

    await this.orderComboItemRepository.createMany(orderCombosToCreate);

    const orderProductsToCreate =
      products?.map(
        (product) =>
          new OrderProductItem({
            productId: product.id,
            annotation: product.annotation,
            orderId: createdOrder.id.toString(),
            quantity: product.quantity,
            totalPrice:
              (productDetails.find((pd) => pd.id.toString() === product.id)
                ?.price || 0) * product.quantity,
          })
      ) ?? [];

    await this.orderProductItemRepository.createMany(orderProductsToCreate);

    return { order: createdOrder };
  }
}
