import React, { FC, InputHTMLAttributes } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  onSubmit: () => void;
  labelText: string;
  placeholder?: string;
}

const LabelAndInput = React.forwardRef<HTMLInputElement, Props>(
  ({ name, labelText, placeholder, onSubmit, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-4 my-4 w-full lg:max-w-[750px]">
        <label className="text-xl" htmlFor={name}>
          {labelText}
        </label>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <input
            {...props}
            name={name}
            ref={ref}
            type="text"
            placeholder={placeholder}
            className="input input-bordered grow w-full sm:w-auto"
          />

          <button
            className="btn btn-outline btn-success w-full sm:w-auto"
            onClick={onSubmit}
          >
            Search
          </button>
        </div>
      </div>
    );
  }
);

export default LabelAndInput;
