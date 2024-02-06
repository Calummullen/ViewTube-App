"use client";

import { resetUserPassword } from "@/app/actions";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ResetPassword {
  email: string;
}

const ResetPassword: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<ResetPassword>({ mode: "onBlur" });
  const [apiError, setApiError] = useState<{
    error: string;
    success: string;
  }>();

  const onSubmit: SubmitHandler<ResetPassword> = async (
    data: ResetPassword
  ) => {
    const response = await resetUserPassword({ email: data.email });
    const responseData = JSON.parse(response);
    if (responseData.error)
      return setApiError({
        error: `An error occurred while resetting your password.`,
        success: "",
      });
    setApiError({
      error: "",
      success:
        "Please check your email to complete the password reset process.",
    });
  };
  return (
    <div className="flex flex-col gap-32 items-center m-4">
      <div className="mt-4 font-bold text-4xl">Password Reset</div>
      <form
        className="animate-in flex-1 flex flex-col w-full md:max-w-lg justify-center gap-2 text-foreground"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-md" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && (
          <span className="text-red-500 ">{errors.email.message}</span>
        )}
        <button
          type="submit"
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
        >
          Reset Password
        </button>
        {apiError?.error && (
          <p className="text-base text-red-500">{apiError.error}</p>
        )}
        {apiError?.success && (
          <p className="text-base text-green-500">{apiError.success}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
