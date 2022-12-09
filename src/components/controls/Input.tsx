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

type Props = {
  label: string;
  formProps: UseFormRegisterReturn;
  autoComplete?: string;
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
    <div className={clsx("flex flex-col gap-2", props.className)}>
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
          "block w-full rounded-md border-none bg-secondary-800 py-2 px-3 shadow-sm ring-offset-secondary-900 text-light focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-900",
          props.error
            ? "ring-1 ring-red-500 ring-offset-2 focus:ring-red-500"
            : "focus:ring-primary-500"
        )}
        defaultValue={props.value}
        aria-invalid={Boolean(props.error)}
        aria-errormessage={`${props.formProps.name}-error`}
        autoFocus={props.autoFocus}
        type={props.type || "text"}
        placeholder={props.placeholder}
        {...props.formProps}
      />
      {props.error && (
        <ErrorMessage id={props.formProps.name}>
          {props.error.message?.toString()}
        </ErrorMessage>
      )}
      {props.note && <div className="text-sm text-gray-600">{props.note}</div>}
    </div>
  );
};
