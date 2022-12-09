import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  id: string; // for aria
};

export const ErrorMessage: FC<Props> = ({ id, children }) => {
  return (
    <span id={`${id}-error`} className="text-sm text-red-600">
      {children}
    </span>
  );
};
