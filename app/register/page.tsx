import { useForm, SubmitHandler } from "react-hook-form";
import RegistrationForm from "@/components/registration-form";
import { RegisterUser } from "../entities/supabase/register-user";
import { registerUserAction } from "../actions";
import { getUser } from "@/utils/supabase/userHelper";
import { redirect } from "next/navigation";

const RegisterPage = async () => {
  const isUserLoggedIn = await getUser();

  if (isUserLoggedIn) {
    redirect("/");
  }

  // const {
  //   register,
  //   handleSubmit,
  //   watch,
  //   formState: { errors },
  // } = useForm<Inputs>();

  // const onMyFormSubmit = async (data: Inputs) => {
  //   await registerUser(data);
  // };

  // const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <RegistrationForm />

    // <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    //   <Link
    //     href="/"
    //     className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //     >
    //       <polyline points="15 18 9 12 15 6" />
    //     </svg>{" "}
    //     Back
    //   </Link>

    //   <form
    //     className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
    //     action={signIn}
    //   >
    //     <label className="text-md" htmlFor="email">
    //       Email
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       name="email"
    //       placeholder="you@example.com"
    //       required
    //     />
    //     <label className="text-md" htmlFor="password">
    //       Password
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       type="password"
    //       name="password"
    //       placeholder="••••••••"
    //       required
    //     />
    //     <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
    //       Sign In
    //     </button>
    //     <button
    //       formAction={signUp}
    //       className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    //     >
    //       Sign Up
    //     </button>
    //     {searchParams?.message && (
    //       <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
    //         {searchParams.message}
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
};

export default RegisterPage;
