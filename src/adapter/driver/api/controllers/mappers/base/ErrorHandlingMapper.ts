import { FastifyReply } from "fastify";

import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";

export abstract class ErrorHandlingMapper {
  convertErrorResponse(error: Error, res: FastifyReply): FastifyReply {
    if (error instanceof ResourceNotFoundError) {
      return res.status(404).send({
        message: `${error.entity} not found.`,
        details: error.details ?? [],
      });
    }

    if (error instanceof AttributeConflictError) {
      return res.status(400).send({
        message: `please inform another ${error.attributeName}.`,
      });
    }

    throw error;
  }
}
