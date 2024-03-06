"use client";

import { registerUserAction } from "@/app/actions";
import { RegisterUser } from "@/app/entities/supabase/register-user";
import Link from "next/link";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

const RegistrationForm: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<RegisterUser>({ mode: "onBlur" });
  const [apiError, setApiError] = useState<{
    error: string;
    success: string;
  }>();

  const onSubmit: SubmitHandler<RegisterUser> = async (data: RegisterUser) => {
    const response = await registerUserAction(data);
    const responseData = JSON.parse(response);
    if (responseData.error)
      return setApiError({
        error: `An error occurred while registering your user ${responseData.error}.`,
        success: "",
      });
    setApiError({
      error: "",
      success: "Please check your email to complete the sign in process.",
    });
  };

  return (
    <div className="flex flex-col gap-32 items-center m-4">
      <div className="mt-4 font-bold text-4xl">Register</div>
      <form
        className="animate-in flex-1 flex flex-col w-full md:max-w-lg justify-center gap-2 text-foreground"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-md" htmlFor="firstName">
          First name
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          {...register("firstName", { required: "First name is required" })}
        />
        {errors.firstName && (
          <span className="text-red-500 ">{errors.firstName.message}</span>
        )}
        <label className="text-md" htmlFor="surname">
          Surname
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          {...register("surname", { required: "Surname is required" })}
        />
        {errors.surname && (
          <span className="text-red-500 ">{errors.surname.message}</span>
        )}
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 ">{errors.email.message}</span>
        )}
        <label className="text-md" htmlFor="password">
          Password
        </label>
        <input
          type="password"
          className="rounded-md px-4 py-2 bg-inherit border"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && (
          <span className="text-red-500 ">{errors.password.message}</span>
        )}
        <label className="text-md" htmlFor="password">
          Confirm password
        </label>
        <input
          type="password"
          className="rounded-md px-4 py-2 bg-inherit border"
          {...register("confirmPassword", {
            required: "Password confirmatuon is required",
            validate: (val: string) => {
              if (watch("password") != val) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500 ">
            {errors.confirmPassword.message}
          </span>
        )}
        <button
          disabled={!isDirty || !isValid}
          type="submit"
          className="bg-green-700 mb-2 rounded-md px-4 py-2 text-foreground mt-6 disabled:bg-slate-700"
        >
          Register
        </button>
        {apiError?.error && (
          <p className="text-base text-red-500">{apiError.error}</p>
        )}
        {apiError?.success && (
          <p className="text-base text-green-500">{apiError.success}</p>
        )}
        {/* {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )} */}
        <p className="text-sm">
          Already have an account?{" "}
          <Link className="text-red-500" href={"/login"}>
            Sign in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
