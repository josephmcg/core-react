import { Link } from "@tanstack/react-router";
import clsx from "clsx";
import { FC, MouseEventHandler, ReactNode } from "react";
import { ButtonStyle } from "~/types/button";

const buttonStyleToColor = {
  [ButtonStyle.Default]: "bg-secondary-500 active:bg-secondary-600",
  [ButtonStyle.Primary]: "bg-primary-500 active:bg-primary-600",
  [ButtonStyle.Error]: "bg-red-500 active:bg-red-600",
  [ButtonStyle.Success]: "bg-green-500 active:bg-green-600",
};

type Props = {
  style?: ButtonStyle;
  children?: ReactNode;
  href?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

export const Button: FC<Props> = (props) => {
  const className = clsx(
    buttonStyleToColor[props.style || ButtonStyle.Default],
    "rounded-md px-4 py-2 text-white",
    props.className
  );

  return props.href ? (
    <Link className={className} href={props.href}>
      {props.children}
    </Link>
  ) : (
    <button className={className} onClick={props.onClick} type={props.type}>
      {props.children}
    </button>
  );
};
