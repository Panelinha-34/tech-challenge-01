/* eslint-disable no-console */
import fastify from "fastify";
import fs from "fs";
import { ZodError } from "zod";

import Swagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import { version } from "../../../../package.json";
import { env } from "../../../env";
import { CategoryRoutes } from "./controllers/CategoryRoutes";
import { ClientRoutes } from "./controllers/ClientRoutes";
import { OrderRoutes } from "./controllers/OrderRoutes";
import { OrderNotificationRoutes } from "./controllers/OrderNotificationRoutes";
import { ProductRoutes } from "./controllers/ProductRoutes";

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
app.register(ProductRoutes, { prefix: "/products" });
app.register(OrderRoutes, { prefix: "/orders" });
app.register(OrderNotificationRoutes, { prefix: "/order_notifications" });
app.register(CategoryRoutes, { prefix: "/categories" });

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    // eslint-disable-next-line consistent-return, array-callback-return
    const errors = error.issues.map((issue) => {
      if (issue.code === "invalid_type") {
        return `field(s) '${issue.path.join(
          ","
        )}' ${issue.message.toLowerCase()}`;
      }

      if (issue.code === "unrecognized_keys") {
        return `field(s) '${issue.keys.join(",")}' not recognized`;
      }
    });

    return reply.code(400).send({ message: "Validation error.", errors });
  }

  if (env.NODE_ENV !== "prod") {
    // eslint-disable-next-line no-console
    console.error(error);
  } else {
    // TODO: Add more details to the error
  }

  return reply.code(500).send({ message: error.message });
});
