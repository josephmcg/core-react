import clsx from "clsx";
import { createElement, FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
  className?: string;
};

export const Text: FC<Props> = (props) => {
  return createElement(
    props.as || "div",
    {
      className: clsx("text", props.className),
    },
    props.children
  );
};
