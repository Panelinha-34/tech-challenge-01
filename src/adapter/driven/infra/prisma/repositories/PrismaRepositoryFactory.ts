import { OrderNotificationsPrismaRepository } from "./OrderNotificationsPrismaRepository";
import { PrismaClientRepository } from "./PrismaClientRepository";
import { PrismaComboProductRepository } from "./PrismaComboProductRepository";
import { PrismaComboRepository } from "./PrismaComboRepository";
import { PrismaOrderComboItemRepository } from "./PrismaOrderComboItemRepository";
import { PrismaOrderRepository } from "./PrismaOrderRepository";
import { PrismaProductRepository } from "./PrismaProductRepository";

let comboProductRepositoryInstance: PrismaComboProductRepository;
let comboRepositoryInstance: PrismaComboRepository;
let productRepositoryInstance: PrismaProductRepository;
let clientRepositoryInstance: PrismaClientRepository;
let orderNotificationsRepository: OrderNotificationsPrismaRepository;
let orderRepository: PrismaOrderRepository;
let orderComboItemRepository: PrismaOrderComboItemRepository;

export function makeComboProductRepository() {
  if (!comboProductRepositoryInstance) {
    comboProductRepositoryInstance = new PrismaComboProductRepository();
  }
  return comboProductRepositoryInstance;
}

export function makeComboRepository() {
  if (!comboRepositoryInstance) {
    comboRepositoryInstance = new PrismaComboRepository(
      makeComboProductRepository()
    );
  }
  return comboRepositoryInstance;
}

export function makeProductRepository() {
  if (!productRepositoryInstance) {
    productRepositoryInstance = new PrismaProductRepository();
  }
  return productRepositoryInstance;
}

export function makeClientRepository() {
  if (!clientRepositoryInstance) {
    clientRepositoryInstance = new PrismaClientRepository();
  }
  return clientRepositoryInstance;
}

export function makeOrderNotificationRepository() {
  if (!orderNotificationsRepository) {
    orderNotificationsRepository = new OrderNotificationsPrismaRepository();
  }
  return orderNotificationsRepository;
}

export function makeOrderComboItemRepository() {
  if (!orderComboItemRepository) {
    orderComboItemRepository = new PrismaOrderComboItemRepository();
  }
  return orderComboItemRepository;
}

export function makeOrderRepository() {
  if (!orderRepository) {
    orderRepository = new PrismaOrderRepository(makeOrderComboItemRepository());
  }
  return orderRepository;
}
