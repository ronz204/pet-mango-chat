import { BaseError } from "./base.error";
import type { ErrorResponse } from "./base.error";

export class ConflictError extends BaseError {
  constructor(message: string = "Resource already exists") {
    super(message, 409, "CONFLICT_ERROR");
  };
};

export class NotFoundError extends BaseError {
  constructor(message: string = "Resource not found") {
    super(message, 404, "NOT_FOUND_ERROR");
  };
};

export const ValidationError: ErrorResponse = {
  success: false,
  error: {
    code: "VALIDATION_ERROR",
    message: "Validation failed for the request",
  },
};