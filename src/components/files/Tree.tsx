import { FC } from "react";
import { TreeItem } from "~/components/files/TreeItem";
import { MOCK_ITEMS } from "~/mock";

export const FileTree: FC = () => {
  return (
    <>
      {MOCK_ITEMS.map((item) => {
        return <TreeItem key={item.id} item={item} />;
      })}
    </>
  );
};
