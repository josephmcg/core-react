import { FC } from "react";
import { useFileStore } from "~/store/files";

export const Breadcrumbs: FC = () => {
  const { setActiveDirectoryId } = useFileStore();
  const activePath = useFileStore((s) => s.computed.activePath());

  return (
    <ol className="flex gap-2 text-sm" aria-label="breadcrumbs">
      <li className="">
        <button onClick={() => setActiveDirectoryId()}>home</button>
      </li>
      {activePath.map((item, i) => {
        return (
          <li key={item.id} className="">
            <button
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
