"use client";

import { registerUser } from "@/app/actions";
import { useForm, SubmitHandler } from "react-hook-form";

export interface Inputs {
  firstName: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

// const test = async (data: Inputs) => {
//   console.log("here123");
//   await registerUser(data);
// };

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid, isDirty },
  } = useForm<Inputs>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<Inputs> = (data: Inputs) => registerUser(data);

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
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mt-6 disabled:bg-slate-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
