import { UserIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import { FC } from "react";
import { Size } from "~/types/global";

const sizeToPx: Record<Size, string> = {
  "2xs": "w-5",
  xs: "w-6",
  sm: "w-8",
  md: "w-10",
  lg: "w-12",
  xl: "w-14",
  "2xl": "w-16",
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
