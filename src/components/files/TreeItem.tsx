import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC, Fragment, useState } from "react";
import { useFileStore } from "~/store/files";
import { IridiumItem } from "~/types/file";
import { fileIconMap } from "~/utils/files";

type Props = {
  item: IridiumItem;
};

export const TreeItem: FC<Props> = (props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { activeDirectoryId, setActiveDirectoryId } = useFileStore();

  return "children" in props.item ? (
    <ul className="flex flex-col gap-1 [&_ul]:pl-2">
      <li
        className={clsx(
          "flex min-w-0 items-center gap-1 rounded-lg",
          activeDirectoryId === props.item.id
            ? "bg-primary-500 bg-opacity-40 text-light"
            : "hover:bg-secondary-800"
        )}
      >
        {"children" in props.item && (
          <button
            className="py-2 px-1 text-medium"
            onClick={() => setIsExpanded((v) => !v)}
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-5 w-5" />
            ) : (
              <ChevronRightIcon className="h-5 w-5" />
            )}
          </button>
        )}
        <button
          className="flex min-w-0 flex-grow items-center gap-2 py-2"
          onClick={() => setActiveDirectoryId(props.item.id)}
        >
          <div
            className={clsx(
              "flex h-6 w-6",
              activeDirectoryId === props.item.id
                ? "text-primary-400"
                : "text-dark"
            )}
          >
            {fileIconMap[props.item.type]}
          </div>
          <div className="block truncate text-sm">{props.item.name}</div>
        </button>
      </li>
      {"children" in props.item &&
        isExpanded &&
        props.item.children.map((child) => {
          return (
            "children" in child && <TreeItem key={child.id} item={child} />
          );
        })}
    </ul>
  ) : (
    <Fragment />
  );
};
