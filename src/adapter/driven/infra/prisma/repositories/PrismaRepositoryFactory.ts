import { OrderNotificationsPrismaRepository } from "./OrderNotificationsPrismaRepository";
import { PrismaClientRepository } from "./PrismaClientRepository";
import { PrismaComboProductRepository } from "./PrismaComboProductRepository";
import { PrismaComboRepository } from "./PrismaComboRepository";
import { PrismaOrderComboItemRepository } from "./PrismaOrderComboItemRepository";
import { PrismaOrderProductItemRepository } from "./PrismaOrderProductItemRepository";
import { PrismaOrderRepository } from "./PrismaOrderRepository";
import { PrismaProductRepository } from "./PrismaProductRepository";
import { SessionPrismaRepository } from "./SessionPrismaRepository";

let comboProductRepositoryInstance: PrismaComboProductRepository;
let comboRepositoryInstance: PrismaComboRepository;
let productRepositoryInstance: PrismaProductRepository;
let clientRepositoryInstance: PrismaClientRepository;
let orderNotificationsRepository: OrderNotificationsPrismaRepository;
let orderRepository: PrismaOrderRepository;
let orderComboItemRepository: PrismaOrderComboItemRepository;
let orderProductItemRepository: PrismaOrderProductItemRepository;
let sessionRepositoryInstance: SessionPrismaRepository;

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

export function makeOrderProductItemRepository() {
  if (!orderProductItemRepository) {
    orderProductItemRepository = new PrismaOrderProductItemRepository();
  }
  return orderProductItemRepository;
}

export function makeOrderRepository() {
  if (!orderRepository) {
    orderRepository = new PrismaOrderRepository(
      makeOrderComboItemRepository(),
      makeOrderProductItemRepository()
    );
  }
  return orderRepository;
}

export function makeSessionRepository() {
  if (!sessionRepositoryInstance) {
    sessionRepositoryInstance = new SessionPrismaRepository();
  }
  return sessionRepositoryInstance;
}
