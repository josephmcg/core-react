import { ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC } from "react";
import { useFileStore } from "~/store/files";

export const Breadcrumbs: FC = () => {
  const { setActiveDirectoryId } = useFileStore();
  const activePath = useFileStore((s) => s.computed.activePath());

  return (
    <ol className="flex items-center gap-1 text-sm" aria-label="breadcrumbs">
      <li>
        <button
          className="rounded px-2 py-1 hover:bg-secondary-800"
          onClick={() => setActiveDirectoryId()}
        >
          home
        </button>
      </li>
      {activePath.map((item, i) => {
        return (
          <li className="flex items-center gap-1" key={item.id}>
            <ChevronRightIcon className="h-6 w-6 text-dark" />
            <button
              className={clsx(
                "max-w-[200px] truncate rounded px-2 py-1",
                i !== activePath.length - 1 && "hover:bg-secondary-800"
              )}
              onClick={() => setActiveDirectoryId(item.id)}
              disabled={i === activePath.length - 1}
            >
              {item.name}
            </button>
          </li>
        );
      })}
    </ol>
  );
};
