export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
};

export class BaseError extends Error {
  constructor(
    public message: string,
    public status: number = 500,
    public code: string = "INTERNAL_ERROR",
  ) {
    super(message);
    this.name = code;
  };

  public toResponse(): Response {
    const response: ErrorResponse = {
      success: false,
      error: {
        code: this.code,
        message: this.message,
      },
    };

    return Response.json(response, { status: this.status });
  };
};