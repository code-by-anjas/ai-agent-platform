"use client";

import { ActionSignIn, ActionSignUp } from "../actions/action-auth";
import { AuthForm } from "../components/auth-form";
import {
  defaultValueSignIn,
  defaultValueSignUp,
  formSchemaSignIn,
  formSchemaSignUp,
} from "../form-schema";

export const AuthPage = ({ type }: { type: "SIGN_IN" | "SIGN_UP" }) => {
  if (type === "SIGN_IN") {
    return (
      <AuthForm
        type='SIGN_IN'
        schema={formSchemaSignIn}
        defaultValues={defaultValueSignIn}
        onSubmit={ActionSignIn}
      />
    );
  }

  return (
    <AuthForm
      type='SIGN_UP'
      schema={formSchemaSignUp}
      defaultValues={defaultValueSignUp}
      onSubmit={ActionSignUp}
    />
  );
};
