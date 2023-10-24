import { z } from "zod";

import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";

export const createProductPayloadSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  category: z.nativeEnum(CategoriesEnum),
});

export const createProductDocSchema = {
  description: "Create a product",
  tags: ["Product"],
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string" },
      price: { type: "number" },
      category: {
        type: "string",
        enum: Object.values(CategoriesEnum),
      },
    },
  },
};
