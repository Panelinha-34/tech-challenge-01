import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Product } from "@/core/domain/entities/Product";
import { CategoriesEnum } from "@/core/domain/enum/CategoriesEnum";
import { Category } from "@/core/domain/valueObjects/Category";
import { Product as PrismaProduct } from "@prisma/client";

export class PrismaProductToDomainClientConverter {
  static convert(prismaClient: PrismaProduct): Product {
    return new Product(
      {
        name: prismaClient.name,
        description: prismaClient.description,
        category: new Category({
          name: prismaClient.category as CategoriesEnum,
        }),
        price: prismaClient.price.toNumber(),
        createdAt: prismaClient.created_at,
        updatedAt: prismaClient.updated_at ?? undefined,
      },
      new UniqueEntityId(prismaClient.id)
    );
  }
}
