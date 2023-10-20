import { FastifyRequest } from "fastify";

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
}
