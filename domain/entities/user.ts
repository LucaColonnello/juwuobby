import type { User } from "../../types";

export function createUser(
  uid: string,
  name?: string,
  email?: string,
): User {
  if (typeof uid === "undefined") {
    throw new Error("User cannot be created without a uid");
  }

  return {
    uid,
    name,
    email,
  };
}
