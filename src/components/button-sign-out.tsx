"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const ButtonSignOut = () => {
  const [pending, setPending] = useState<boolean>(false);
  const router = useRouter();

  const signOut = () => {
    setPending(true);

    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/sign-in");
          toast.success("Sign out Successfull!", {
            description: "Your account has been sign out successfully",
          });
        },
      },
    });

    setPending(false);
  };

  return (
    <Button onClick={signOut} disabled={pending}>
      Logout
    </Button>
  );
};
