import { FastifyReply } from "fastify";

import { AttributeConflictError } from "@/core/application/useCases/errors/AttributeConflictError";
import { ResourceNotFoundError } from "@/core/application/useCases/errors/ResourceNotFoundError";
import { EntityPropValidationError } from "@/core/domain/base/error/EntityPropValidationError";
import { ValueObjectValidationError } from "@/core/domain/base/error/ValueObjectValidationError";

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

    if (error instanceof EntityPropValidationError) {
      return res.status(400).send({
        message: "validation error",
        details: [
          {
            attribute: error.propName,
            message: error.validationError,
          },
        ],
      });
    }

    if (error instanceof ValueObjectValidationError) {
      return res.status(400).send({
        message: error.message,
        details: error.details ?? [],
      });
    }

    throw error;
  }
}
