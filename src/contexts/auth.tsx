import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AuthContext = {
  setAuth: (val: boolean) => void;
} & AuthContextState;

type AuthContextState = {
  isAuthenticated: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContext>(null!);

export function AuthProvider(props: { children: ReactNode }) {
  const [state, setState] = useState<AuthContextState>({
    isAuthenticated: false,
  });

  const setAuth = (isAuthenticated: boolean) => {
    setState({ isAuthenticated });
  };

  const contextValue = useMemo(
    () => ({
      ...state,
      setAuth,
    }),
    [state]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
