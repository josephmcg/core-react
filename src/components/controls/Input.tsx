import clsx from "clsx";
import { HTMLInputTypeAttribute } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form/dist/types";
import { UseFormRegisterReturn } from "react-hook-form/dist/types/form";
import { ErrorMessage } from "~/components/controls/ErrorMessage";
import { Size } from "~/types/global";

type Props = {
  label: string;
  formProps: UseFormRegisterReturn;
  autoComplete?: string;
  size?: Size;
  note?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
  value?: string;
  className?: string;
  autoFocus?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  showLabel?: boolean;
};

export const Input = (props: Props) => {
  return (
    <div className={props.className}>
      <label
        htmlFor={props.formProps.name}
        className={clsx("block text-sm font-medium", {
          "sr-only": !props.showLabel,
        })}
      >
        {props.label}
      </label>
      <input
        id={props.formProps.name}
        autoComplete={props.autoComplete || props.formProps.name}
        className={clsx(
          "mt-1 block w-full rounded-md border-none bg-secondary-800 py-2 px-3 shadow-sm text-light focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-900",
          props.error
            ? "ring-red-500 focus:ring-red-500"
            : "focus:ring-primary-500"
        )}
        defaultValue={props.value}
        aria-invalid={Boolean(props.error)}
        aria-describedby={`${props.formProps.name}-error`}
        autoFocus={props.autoFocus}
        type={props.type || "text"}
        placeholder={props.placeholder}
        {...props.formProps}
      />
      <div className="flex items-center justify-between">
        {props.error && (
          <ErrorMessage id={props.formProps.name}>
            {props.error.message?.toString()}
          </ErrorMessage>
        )}
        {props.note && (
          <div className="ml-2 -mb-4 text-sm text-gray-600">{props.note}</div>
        )}
      </div>
    </div>
  );
};
