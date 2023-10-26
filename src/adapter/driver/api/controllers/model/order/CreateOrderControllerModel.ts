import { z } from "zod";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable guard-for-in */

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
  clientName: z.string().optional(),
  combos: z.array(orderComboSchema).optional(),
  products: z.array(orderProductSchema).optional(),
});

export interface CreateOrderControllerResponse {}

export const createOrderDocSchema = {
  description: "Create a order",
  tags: ["Order"],
  body: {
    type: "object",
    properties: {
      clientId: { type: "string" },
      clientName: { type: "string" },
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
