"use client";

import { signIn } from "@/utils/supabase/userHelper";
import Link from "next/link";
import { FC } from "react";

const Login: FC = () => {
  return (
    <div className="flex flex-col gap-32 items-center m-4">
      <div className="mt-4 font-bold text-4xl">Sign in</div>
      <form
        className="animate-in flex-1 flex flex-col w-full md:max-w-lg justify-center gap-2 text-foreground"
        action={async (formData) => {
          await signIn(formData);
          // const appContext = useContext(AppContext);
          // appContext.setUser(data.user);
        }}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
          Sign In
        </button>
        {/* {searchParams?.message && (
        <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
          {searchParams.message}
        </p>
      )} */}
        <p className="text-sm">
          No account?{" "}
          <Link className="text-green-500" href={"/register"}>
            Sign up
          </Link>
        </p>
        <p className="text-sm">
          Forgot your password?{" "}
          <Link className="text-red-500" href={"/reset-password"}>
            Reset it here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
