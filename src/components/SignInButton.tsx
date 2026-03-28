"use client";
import { login } from "@/actions/auth";
import { LogIn } from "lucide-react";
import React from "react";

const SignInButton = () => {
  return (
    <div>
      <button
        onClick={() => login()}
        className="flex items-center justify-center gap-1 cursor-pointer hover:underline"
      >
        Sign in
        <LogIn className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SignInButton;
