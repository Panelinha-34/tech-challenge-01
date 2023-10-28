import { beforeEach, describe, expect, it, vi } from "vitest";

import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { Category } from "@prisma/client";

const coreEnum = CategoriesEnum;
const sut = Category;

describe("Given Category database Enum", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("The Category database enum should be exactly the Category core enum", async () => {
    expect(coreEnum).toEqual(sut);
  });
});
