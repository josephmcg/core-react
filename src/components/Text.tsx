import clsx from "clsx";
import { createElement, FC, ReactNode } from "react";
import { Size } from "~/types/global";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "div";
  className?: string;
  size: Size;
  color?: "light" | "medium" | "dark";
};

export const Text: FC<Props> = (props) => {
  // provide default color based on element type, but allow overriding with props
  const colorClass = () => {
    switch (props.color) {
      case "light":
        return "text-light";
      case "medium":
        return "text-medium";
      case "dark":
        return "text-dark";
    }
    switch (props.as) {
      case "h1":
      case "h2":
      case "h3":
      case "h4":
      case "h5":
      case "h6":
        return "text-light";
    }
    return "text-medium";
  };

  return createElement(
    props.as || "div",
    {
      className: clsx(colorClass, props.className),
    },
    props.children
  );
};
