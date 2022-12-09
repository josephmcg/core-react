import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "~/contexts/auth";
import { IndexPage } from "~/routes";
import { ChatPage } from "~/routes/chat";
import { FilesPage } from "~/routes/files";
import { FriendsPage } from "~/routes/friends";
import { InvalidPage } from "~/routes/invalid";

const router = createBrowserRouter([
  {
    path: "/",
    element: <IndexPage />,
  },
  {
    path: "chat",
    element: <ChatPage />,
  },
  {
    path: "files",
    element: <FilesPage />,
  },
  {
    path: "friends",
    element: <FriendsPage />,
  },
  // 404
  { path: "*", element: <InvalidPage /> },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export { App };
