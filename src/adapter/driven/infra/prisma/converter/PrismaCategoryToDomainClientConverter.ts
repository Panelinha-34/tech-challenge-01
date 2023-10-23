import { UniqueEntityId } from "@/core/domain/base/entities/UniqueEntityId";
import { Category } from "@/core/domain/entities/Category";
import { Category as PrismaCategory } from "@prisma/client";

export class PrismaCategoryToDomainCategoryConverter {
  static convert(prismaCategory: PrismaCategory): Category {
    return new Category(
      {
        name: prismaCategory.name,
      },
      new UniqueEntityId(prismaCategory.id)
    );
  }
}
