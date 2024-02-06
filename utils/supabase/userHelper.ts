"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

const createSBClient = () => {
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

export const resetPassword = async (email: string) => {
  const supabaseClient = createSBClient();
  return await supabaseClient.auth.resetPasswordForEmail(email, {
    redirectTo: "/change-password",
  });
};
