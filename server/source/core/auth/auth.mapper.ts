import type { User } from "@prisma/client";
import type { AuthSchema } from "./auth.schema";

export class AuthMapper {
  public static toResponse(user: User): AuthSchema {
    return {
      userId: user.id,
    };
  };
};