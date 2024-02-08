"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { useContext } from "react";
import { AppContext } from "@/utils/context/app.context";

export const createSBClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

export const getUser = async () => {
  const supabaseClient = createSBClient();
  const {
    data: { user },
  } = await supabaseClient.auth.getUser();

  return user;
};

export const logout = async () => {
  const supabaseClient = createSBClient();
  return await supabaseClient.auth.signOut();
};

export const signIn = async (formData: FormData) => {
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
  return redirect("/");
};

export const resetPassword = async (email: string) => {
  const supabaseClient = createSBClient();
  return await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: "/change-password",
  });
};
