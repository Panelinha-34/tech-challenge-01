/* eslint-disable no-console */
import fastify from "fastify";
import fs from "fs";
import { ZodError } from "zod";

import Swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { version } from "../../../../package.json";
import { env } from "../../../env";
import { ClientRoutes } from "./controllers/ClientRoutes";

const SWAGGER_PATH = "/docs-swagger";

export const app = fastify();

app.register(Swagger, {
  openapi: {
    info: {
      title: "Tech Challenge #1 - API",
      description: "API for the Tech Challenge #1",
      version,
    },
  },
});

app.register(fastifySwaggerUi, {
  routePrefix: SWAGGER_PATH,
});

app.get("/docs", (request, response) => {
  const stream = fs.createReadStream(`${`${process.cwd()}/index.html`}`);

  response.type("text/html").send(stream);
});

app.register(ClientRoutes, { prefix: "/clients" });

// Return errors for all routes
app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .code(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "prod") {
    console.error(error);
  } else {
    // TODO: Add more details to the error
  }

  return reply.code(500).send({ message: "Internal server error." });
});
