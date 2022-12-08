import { FolderIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { ReactNode } from "react";
import { DirectoryTypes, FileTypes, IridiumItem } from "~/types/file";

// todo - remove partial later and add all types
export const fileIconMap: Partial<Record<IridiumItem["type"], ReactNode>> = {
  [DirectoryTypes.DEFAULT]: <FolderIcon />,
  [FileTypes.PNG]: <PhotoIcon />,
};
