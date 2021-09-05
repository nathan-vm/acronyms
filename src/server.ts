/* eslint-disable import-helpers/order-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";

import { router } from "./routes";

import "./database";
import "./shared/container";
import { AppError } from "./shared/errors/AppError";

const app = express();
const PORT = 3333;

app.use(express.json());

app.use(router);

app.use(
  (err: Error, _request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "Error",
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "Error",
      message: "Inernal server error",
    });
  },
);

app.listen(PORT, () =>
  console.log(`Server is running at: http://localhost:${PORT}`),
);
