import { FC } from "react";
import { Button } from "~/components/controls/Button";
import { DefaultLayout } from "~/components/layout/Default";
import { ButtonColor } from "~/types/button";

// display on 404 error
export const InvalidPage: FC = () => (
  <DefaultLayout>
    <main className="sm:flex">
      <p className="text-4xl font-bold tracking-tight text-indigo-600 sm:text-5xl">
        404
      </p>
      <div className="sm:ml-6">
        <div className="sm:border-l sm:border-gray-200 sm:pl-6">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p className="mt-1 text-base text-gray-500">
            Please check the URL in the address bar and try again.
          </p>
        </div>
        <div className="mt-10 flex space-x-3 sm:border-l sm:border-transparent sm:pl-6">
          <Button to="/" color={ButtonColor.Primary}>
            Go back home
          </Button>
        </div>
      </div>
    </main>
  </DefaultLayout>
);
