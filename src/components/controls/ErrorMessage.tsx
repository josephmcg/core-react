import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
  id: string; // for aria
};

export const ErrorMessage: FC<Props> = ({ id, children }) => {
  return (
    <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
      {children}
    </p>
  );
};
