"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function SignInButton() {
  return (
    <Button variant={"outline"} onClick={() => signIn()}>
      Sign in with Github
    </Button>
  );
}