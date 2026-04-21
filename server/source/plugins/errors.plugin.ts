import { Elysia } from "elysia";
import { BaseError } from "@errors/base.error";

import { 
  ConflictError,
  NotFoundError,
  ValidationError,
} from "@errors/barrep.error";

export const ErrorsPlugin = new Elysia({ name: "error.plugin" })
  .error({
    ConflictError,
    NotFoundError,
  })
  
  .onError(({ error, code }) => {
    if (code === "VALIDATION") {
      return Response.json(ValidationError, { status: 400 });
    };

    if (error instanceof BaseError) {
      return error.toResponse();
    };
  });
