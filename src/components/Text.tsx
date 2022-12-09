import clsx from "clsx";
import { createElement, FC, ReactNode } from "react";
import { Size } from "~/types/global";

type Props = {
  children: ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "div";
  className?: string;
  size?: Size;
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
  };

  const sizeClass = () => {
    switch (props.size) {
      case "4xl":
        return "text-4xl";
      case "3xl":
        return "text-3xl";
      case "2xl":
        return "text-2xl";
      case "xl":
        return "text-xl";
      case "lg":
        return "text-lg";
      case "md":
        return "text-base";
      case "sm":
        return "text-sm";
      case "xs":
        return "text-xs";
    }
    switch (props.as) {
      case "h1":
        return "text-3xl";
      case "h2":
        return "text-2xl";
      case "h3":
        return "text-xl";
      case "h4":
        return "text-lg";
      case "h5":
        return "text-base";
      case "h6":
      case "label":
        return "text-sm";
    }
  };

  return createElement(
    props.as || "div",
    {
      className: clsx(colorClass(), sizeClass(), props.className),
    },
    props.children
  );
};
