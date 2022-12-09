import clsx from "clsx";
import { FC, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ButtonStyle } from "~/types/button";
import { Size } from "~/types/global";

const buttonStyleToColor: Record<ButtonStyle, string> = {
  [ButtonStyle.Default]: "bg-secondary-500 active:bg-secondary-600",
  [ButtonStyle.Primary]: "bg-primary-500 active:bg-primary-600",
  [ButtonStyle.Error]: "bg-red-500 active:bg-red-600",
  [ButtonStyle.Success]: "bg-green-500 active:bg-green-600",
};

const buttonSize: Partial<Record<Size, string>> = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-sm",
  lg: "px-4 py-2",
  xl: "px-6 py-3",
};

type Props = {
  style?: ButtonStyle;
  children?: ReactNode;
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  size?: Size;
};

export const Button: FC<Props> = (props) => {
  const className = clsx(
    buttonStyleToColor[props.style || ButtonStyle.Default],
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
