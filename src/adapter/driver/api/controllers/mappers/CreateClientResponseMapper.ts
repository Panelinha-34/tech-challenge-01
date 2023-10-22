import { FastifyRequest } from "fastify";

import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { CreateClientUseCaseProps } from "@/core/application/useCases/model/CreateClientUseCaseModel";

import { createClientPayloadSchema } from "../model/CreateClientControllerModel";

export class CreateClientMapper {
  static convertPayload(req: FastifyRequest): CreateClientUseCaseProps {
    const { email, name, taxVat } = createClientPayloadSchema.parse(req.body);

    return {
      email,
      name,
      taxVat,
    };
  }

  static convertErrorMessage(error: Error): string | null {
    if (error instanceof AttributeConflictError) {
      return `field ${error.attributeName} already in use`;
    }

    return null;
  }
}
