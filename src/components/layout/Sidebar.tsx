import clsx from "clsx";
import { FC, ReactNode } from "react";
import { Nav } from "~/components/Nav";

type Props = {
  children: ReactNode;
  className?: string;
  topElement?: ReactNode;
};

export const Sidebar: FC<Props> = ({ children, className, topElement }) => {
  return (
    <aside className="flex w-[300px] flex-shrink-0 flex-col border-r transition-[margin-left] max-md:ml-[-300px]">
      {topElement}
      <div className={clsx("flex min-h-0 flex-grow flex-col", className)}>
        {children}
      </div>
      <Nav />
    </aside>
  );
};
