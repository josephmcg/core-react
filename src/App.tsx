import {
  createReactRouter,
  createRouteConfig,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { AuthProvider } from "~/contexts/auth";
import { IndexPage } from "~/routes";
import { ChatPage } from "~/routes/chat";

const rootRoute = createRouteConfig({
  component: () => <Outlet />,
});

const indexRoute = rootRoute.createRoute({
  path: "/",
  component: IndexPage,
});

const chatRoute = rootRoute.createRoute({
  path: "/chat",
  component: ChatPage,
});

const routeConfig = rootRoute.addChildren([indexRoute, chatRoute]);

const router = createReactRouter({ routeConfig });

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
};

export { App };
