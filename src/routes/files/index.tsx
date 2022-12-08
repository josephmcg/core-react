import clsx from "clsx";
import { useDropArea } from "react-use";
import { Breadcrumbs } from "~/components/files/Breadcrumbs";
import { FileTable } from "~/components/files/Table";
import { FileTree } from "~/components/files/Tree";
import { AuthLayout } from "~/components/layout/Auth";
import { Main } from "~/components/layout/Main";
import { Sidebar } from "~/components/layout/Sidebar";
import { Top } from "~/components/layout/Top";

const FilesPage = () => {
  const [bond, state] = useDropArea({
    onFiles: (files) => console.log("upload these files", files),
  });

  return (
    <AuthLayout>
      <Sidebar className="thin-scroll min-h-0 gap-1 overflow-auto py-1 px-2">
        <FileTree />
      </Sidebar>
      <Main>
        <Top>
          <Breadcrumbs />
        </Top>
        <div
          className={clsx(
            "flex-grow overflow-y-auto",
            state.over && "ring-2 ring-inset ring-primary-500"
          )}
          {...bond}
        >
          <FileTable />
        </div>
      </Main>
    </AuthLayout>
  );
};

export { FilesPage };
