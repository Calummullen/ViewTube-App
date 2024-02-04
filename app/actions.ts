import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Inputs } from "@/components/registration-form";

export async function registerUser(data: Inputs) {
  console.log("sdfsdfsdfds");
  console.log(data);
}

// const register = async (formData: FormData) => {
//   "use server";

//   const origin = headers().get("origin");
//   const firstName = formData.get("firstName") as string;
//   const surname = formData.get("surname") as string;
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;
//   const cookieStore = cookies();
//   const supabase = createClient(cookieStore);

//   const { error } = await supabase.auth.signUp({
//     email,
//     password,
//     options: {
//       emailRedirectTo: `${origin}/auth/callback`,
//       data: {
//         firstName,
//         surname,
//       },
//     },
//   });

//   if (error) {
//     return redirect("/login?message=Could not authenticate user");
//   }

//   return redirect("/login?message=Check email to continue sign in process");
// };
