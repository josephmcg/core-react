import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Top: FC<Props> = ({ children }) => {
  return (
    <div className="flex min-h-14 flex-shrink-0 items-center gap-4 border-b px-4 py-2">
      {children}
    </div>
  );
};
