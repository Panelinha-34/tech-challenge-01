/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */

import { z } from "zod";

import { PaymentMethodEnum } from "@/core/domain/enum/PaymentMethodEnum";
import { PaymentStatusEnum } from "@/core/domain/enum/PaymentStatusEnum";

const orderComboSchema = z.object({
  sandwichId: z.string().optional(),
  sideId: z.string().optional(),
  drinkId: z.string().optional(),
  dessertId: z.string().optional(),
  annotation: z.string().optional(),
  quantity: z.number(),
});

const orderProductSchema = z.object({
  id: z.string(),
  quantity: z.number(),
  annotation: z.string().optional(),
});

export const createOrderPayloadSchema = z.object({
  clientId: z.string().optional(),
  visitorName: z.string().optional(),
  paymentMethod: z.nativeEnum(PaymentMethodEnum),
  paymentStatus: z.nativeEnum(PaymentStatusEnum),
  paymentDetails: z.string().optional(),
  combos: z.array(orderComboSchema).optional(),
  products: z.array(orderProductSchema).optional(),
});

export interface CreateOrderControllerResponse {}

export const createOrderDocSchema = {
  description: "Create a order",
  tags: ["Order "],
  body: {
    type: "object",
    properties: {
      clientId: { type: "string" },
      visitorName: {
        type: "string",
        description:
          "This field is used for users who do not want to identify themselves.",
      },
      paymentMethod: {
        type: "string",
        enum: Object.values(PaymentMethodEnum),
      },
      paymentStatus: {
        type: "string",
        enum: Object.values(PaymentStatusEnum),
      },
      paymentDetails: {
        type: "string",
        description: "This field is used for payment details.",
      },
      combos: {
        type: "array",
        items: {
          type: "object",
          properties: {
            sandwichId: { type: "string" },
            sideId: { type: "string" },
            drinkId: { type: "string" },
            dessertId: { type: "string" },
            quantity: { type: "number" },
            annotation: { type: "string" },
          },
        },
      },
      products: {
        type: "array",
        items: {
          type: "object",
          properties: {
            id: { type: "string" },
            quantity: { type: "number" },
            annotation: { type: "string" },
          },
        },
      },
    },
  },
};
