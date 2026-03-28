import { signIn } from "next-auth/react";

export const login = async () => {
  await signIn("google", { callbackUrl: "/" });
};
