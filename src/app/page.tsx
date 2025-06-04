import { ButtonSignOut } from "@/components/button-sign-out";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Home() {
  const sesssion = await auth.api.getSession({
    headers: await headers(),
  });

  if (sesssion) {
    return (
      <div>
        <p>You login as {sesssion.user.name}</p>
        <ButtonSignOut />
      </div>
    );
  }

  return <p>Please log in</p>;
}
