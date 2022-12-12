import clsx from "clsx";
import { HTMLInputTypeAttribute, useId } from "react";
import {
  FieldError,
  FieldErrorsImpl,
  FieldValues,
  Merge,
} from "react-hook-form/dist/types";
import { UseFormRegisterReturn } from "react-hook-form/dist/types/form";
import { ErrorMessage } from "~/components/controls/ErrorMessage";

// if part of a validated form ? use formProps : use onChange
type Props = {
  label: string;
  formProps?: UseFormRegisterReturn;
  note?: string;
  error?: FieldError | Merge<FieldError, FieldErrorsImpl<FieldValues>>;
  value?: string;
  className?: string;
  autoFocus?: boolean;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  showLabel?: boolean;
  onChange?: (val: string) => void;
};

export const Input = (props: Props) => {
  const id = useId();

  return (
    <div className={clsx("flex flex-col gap-2", props.className)}>
      <label
        htmlFor={id}
        className={clsx("block text-sm font-medium", {
          "sr-only": !props.showLabel,
        })}
      >
        {props.label}
      </label>
      <input
        id={id}
        className={clsx(
          "block w-full rounded-md border-none bg-secondary-800 py-2 px-3 shadow-sm ring-offset-secondary-900 text-light focus:ring-2 focus:ring-offset-2 focus:ring-offset-secondary-900",
          props.error
            ? "ring-1 ring-red-500 ring-offset-2 focus:ring-red-500"
            : "focus:ring-primary-500"
        )}
        defaultValue={props.value}
        aria-invalid={Boolean(props.error)}
        aria-errormessage={`${id}-error`}
        autoFocus={props.autoFocus}
        type={props.type || "text"}
        placeholder={props.placeholder}
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
        {...props.formProps}
      />
      {props.error && (
        <ErrorMessage id={id}>{props.error.message?.toString()}</ErrorMessage>
      )}
      {props.note && <div className="text-sm text-gray-600">{props.note}</div>}
    </div>
  );
};
