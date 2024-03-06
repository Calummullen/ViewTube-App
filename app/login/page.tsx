import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { getUser } from "@/utils/supabase/userHelper";
import { Suspense } from "react";
import Login from "@/components/login";

const LoginPage = async ({
  searchParams,
}: {
  searchParams: { message: string };
}) => {
  const isUserLoggedIn = await getUser();

  if (isUserLoggedIn) {
    redirect("/");
  }

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }
    return data;
  };

  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
