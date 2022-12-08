import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~/contexts/auth";
import { IndexPage } from "~/routes";
import { ChatPage } from "~/routes/chat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "chat",
    element: <ChatPage />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export { App };
