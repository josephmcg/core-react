import clsx from "clsx";
import { FC, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ButtonColor } from "~/types/button";

const buttonColor: Record<ButtonColor, string> = {
  [ButtonColor.Default]: "bg-secondary-500 active:bg-secondary-600",
  [ButtonColor.Primary]: "bg-primary-500 active:bg-primary-600",
  [ButtonColor.Error]: "bg-red-500 active:bg-red-600",
  [ButtonColor.Success]: "bg-green-500 active:bg-green-600",
};

const buttonSize: Record<ButtonSize, string> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2",
  xl: "px-6 py-3",
};

type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

type Props = {
  color?: ButtonColor;
  children?: ReactNode;
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  size?: ButtonSize;
};

export const Button: FC<Props> = (props) => {
  const className = clsx(
    buttonColor[props.color || ButtonColor.Default],
    buttonSize[props.size || "md"],
    "rounded-md text-white font-medium shadow-sm",
    props.className
  );

  return props.to ? (
    <Link className={className} to={props.to}>
      {props.children}
    </Link>
  ) : (
    <button className={className} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};
