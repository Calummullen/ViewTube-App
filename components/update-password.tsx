"use client";

import { updateUserPassword } from "@/app/actions";
import { FC, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";

interface UpdatePassword {
  password: string;
  confirmPassword: string;
}

const UpdatePassword: FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<UpdatePassword>({ mode: "onBlur" });
  const [apiError, setApiError] = useState<{
    error: string;
    success: string;
  }>();
  const searchParams = useSearchParams();

  const onSubmit: SubmitHandler<UpdatePassword> = async (
    data: UpdatePassword,
  ) => {
    console.log("data", data);

    const sessionCode = searchParams.get("code");
    const response = await updateUserPassword(sessionCode ?? "", data.password);
    if (response) {
      const responseData = JSON.parse(response);
      return setApiError({
        error: `An error occurred while resetting your password. ${responseData}`,
        success: "",
      });
    }

    // return redirect("/");
    // setApiError({
    //   error: "",
    //   success: "Successfully updated password.",
    // });
  };
  console.log(apiError);
  return (
    <div className="flex flex-col gap-32 items-center m-4">
      <div className="mt-4 font-bold text-4xl">Update Password</div>
      <form
        className="animate-in flex-1 flex flex-col w-full md:max-w-lg justify-center gap-2 text-foreground"
        onSubmit={handleSubmit(onSubmit)}
      >
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
          type="submit"
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2 mt-6"
        >
          Update Password
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

export default UpdatePassword;
