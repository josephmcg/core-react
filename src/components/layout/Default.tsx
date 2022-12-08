import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <div className="container mx-auto flex h-full flex-col items-center justify-center">
      {children}
    </div>
  );
};
