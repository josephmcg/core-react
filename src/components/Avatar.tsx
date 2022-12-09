import { UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FC } from "react";
import { Size } from "~/types/global";

const sizeToPx: Record<Size, string> = {
  xs: "w-5",
  sm: "w-6",
  md: "w-8",
  lg: "w-10",
  xl: "w-12",
  "2xl": "w-14",
  "3xl": "w-16",
  "4xl": "w-20",
};

type Props = {
  size?: Size;
  src?: string;
};

export const Avatar: FC<Props> = (props) => {
  return (
    <div
      className={clsx(
        sizeToPx[props.size || "md"],
        "relative flex aspect-square flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-400 text-gray-200"
      )}
    >
      {props.src ? (
        <img
          src={props.src}
          className="absolute inset-0 object-cover"
          alt=""
          draggable={false}
          sizes="100%"
        />
      ) : (
        <UserIcon className="w-2/3" />
      )}
    </div>
  );
};
