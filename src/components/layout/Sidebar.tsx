import clsx from "clsx";
import { FC, ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Input } from "~/components/controls/Input";
import { Nav } from "~/components/Nav";

type Props = {
  children: ReactNode;
  className?: string;
};

export const Sidebar: FC<Props> = ({ children, className }) => {
  const { register } = useForm();

  return (
    <aside className="flex w-[300px] flex-shrink-0 flex-col border-r transition-[margin-left] max-md:ml-[-300px]">
      <div className="flex flex-col gap-2 p-4">
        <Input
          type="search"
          label="search"
          formProps={register("search")}
          placeholder="Search"
        />
      </div>
      <div className={clsx(["flex min-h-0 flex-grow flex-col", className])}>
        {children}
      </div>
      <Nav />
    </aside>
  );
};
