"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { RegisterUser } from "./entities/supabase/register-user";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AuthError, UserResponse } from "@supabase/supabase-js";

const createSBClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

// export const getUserAvatar = async (path: string): Promise<string> => {
//   const createClient = createSBClient();
//   const { data, error } = await createClient.storage
//     .from("avatars")
//     .download(path);
//   if (error) {
//     throw error;
//   }

//   return URL.createObjectURL(data);
// };

// TODO: get event.target.files type
export const updateProfileAvatar = async (id: string, filePath: string) => {
  const createClient = createSBClient();
  return await createClient
    .from("profiles")
    .upsert({ id, avatar_url: filePath });
};

export const updateUserPassword = async (
  authCode: string,
  password: string
) => {
  const createClient = createSBClient();
  await createClient.auth.exchangeCodeForSession(authCode);
  const response = await createClient.auth.updateUser({ password });
  if (response.error) {
    return JSON.stringify(response);
  }

  redirect("/");
};

export const resetUserPassword = async (formData: { email: string }) => {
  const createClient = createSBClient();
  const response = await createClient.auth.resetPasswordForEmail(
    formData.email,
    {
      redirectTo: `http://localhost:3000/update-password`,
    }
  );
  return JSON.stringify(response);
};

export const setUserTheme = async (dataTheme: string) => {
  const createClient = createSBClient();
  const response = await createClient.auth.updateUser({
    data: {
      dataTheme,
    },
  });
};

export const addYoutubeHandleToUser = async (
  youtubeHandle: string
): Promise<UserResponse> => {
  const createClient = createSBClient();
  const response = await createClient.auth.updateUser({
    data: {
      youtubeHandle,
    },
  });
  console.log("response", response);
  return response;
};

export const registerUserAction = async (
  formData: RegisterUser
): Promise<string> => {
  const origin = headers().get("origin");
  const createClient = createSBClient();
  const { confirmPassword, ...convertedData } = formData;
  const { email, password, firstName, surname } = convertedData;

  const response = await createClient.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
      data: {
        firstName,
        surname,
        youtubeHandle: "",
      },
    },
  });

  return JSON.stringify(response);

  // if (error) {
  //   return redirect("/login?message=Could not authenticate user");
  // }

  // return redirect("/login?message=Check email to continue sign in process");
};

// const register = async (formData: FormData) => {

//   if (error) {
//     return redirect("/login?message=Could not authenticate user");
//   }

//   return redirect("/login?message=Check email to continue sign in process");
// };
