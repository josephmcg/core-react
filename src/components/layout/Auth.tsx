import clsx from "clsx";
import { FC, ReactNode } from "react";
import { useAuth } from "~/contexts/auth";
import { IndexPage } from "~/routes";

type Props = {
  children: ReactNode;
  className?: string;
};

export const AuthLayout: FC<Props> = (props) => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <div className={clsx("flex h-full", props.className)}>{props.children}</div>
  ) : (
    <IndexPage />
  );
};
