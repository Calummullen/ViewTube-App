"use server";

import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { RegisterUser } from "./entities/supabase/register-user";
import { redirect } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";

const createSBClient = () => {
  const cookieStore = cookies();
  return createClient(cookieStore);
};

// export const uploadAvatar = async (event: any) => {
//   const createClient = createSBClient();

//   if (!event.target.files || event.target.files.length === 0) {
//     throw new Error("You must select an image to upload.");
//   }

//   const file = event.target.files[0];
//   const fileExt = file.name.split(".").pop();
//   const fileName = `${Math.random()}.${fileExt}`;
//   const filePath = `${fileName}`;

//   const { error: uploadError } = await createClient.storage
//     .from("avatars")
//     .upload(filePath, file);
//   // error handling
//   const { error } = await createClient
//     .from("profiles")
//     .upsert({ avatar_url: filePath });
//   // error handling
// };

export const getUserAvatar = async (path: string): Promise<string> => {
  const createClient = createSBClient();
  const { data, error } = await createClient.storage
    .from("avatars")
    .download(path);
  if (error) {
    throw error;
  }

  return URL.createObjectURL(data);
};

// TODO: get event.target.files type
export const updateProfileAvatar = async (id: string, filePath: string) => {
  const createClient = createSBClient();

  // if (!event.target.files || event.target.files.length === 0) {
  //   throw new Error("You must select an image to upload.");
  // }

  // const file = event.target.files[0];
  // const fileExt = file.name.split(".").pop();
  // const filePath = `${id}-${Math.random()}.${fileExt}`;

  // const { data: uploadData, error: uploadError } = await createClient.storage
  //   .from("avatars")
  //   .upload(filePath, file);
  //   console.log('upload', uploadData, uploadError);

  // maybe move this out?

  const { data, error } = await createClient
    .from("profiles")
    .upsert({ id, avatar_url: filePath });
  console.log("response", data, error);
};

export const updateUserPassword = async (
  authCode: string,
  password: string,
) => {
  const createClient = createSBClient();
  await createClient.auth.exchangeCodeForSession(authCode);
  const response = await createClient.auth.updateUser({ password });
  if (response.error) {
    return JSON.stringify(response);
  }

  redirect("/");
  // console.log("error", response);
  // return JSON.stringify(response);
};

export const resetUserPassword = async (formData: { email: string }) => {
  const createClient = createSBClient();
  const response = await createClient.auth.resetPasswordForEmail(
    formData.email,
    {
      redirectTo: `http://localhost:3000/update-password`,
    },
  );
  return JSON.stringify(response);
};

export const registerUserAction = async (
  formData: RegisterUser,
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
