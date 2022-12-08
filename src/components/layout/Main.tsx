import { FC, ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const Main: FC<Props> = ({ children }) => {
  return <main className="flex min-w-0 flex-grow flex-col">{children}</main>;
};
