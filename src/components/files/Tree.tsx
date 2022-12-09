import { FC } from "react";
import { MOCK_ITEMS } from "~/assets/mock";
import { TreeItem } from "~/components/files/TreeItem";

export const FileTree: FC = () => {
  return (
    <>
      {MOCK_ITEMS.map((item) => {
        return <TreeItem key={item.id} item={item} />;
      })}
    </>
  );
};
