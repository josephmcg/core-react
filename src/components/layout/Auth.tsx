import { FC, ReactNode } from "react";
import { useAuth } from "~/contexts/auth";
import { IndexPage } from "~/routes";

type Props = {
  children: ReactNode;
};

export const AuthLayout: FC<Props> = ({ children }) => {
  const auth = useAuth();

  return auth.isAuthenticated ? (
    <div className="flex h-full">{children}</div>
  ) : (
    <IndexPage />
  );
};
