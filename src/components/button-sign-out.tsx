"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "./ui/button";

export const ButtonSignOut = () => {
  const router = useRouter();

  const signOut = () => {
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
  };

  return <Button onClick={signOut}>Logout</Button>;
};
