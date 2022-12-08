import create from "zustand";
import { fileManager } from "~/lib/FileManager";
import {
  FileSort,
  FileSortOptions,
  IridiumDirectory,
  IridiumItem,
} from "~/types/file";

interface FileState {
  sort: FileSort;
  activeDirectoryId?: IridiumDirectory["id"];

  setSort: (val: FileSort) => void;
  setActiveDirectoryId: (selectedFolder?: IridiumItem["id"]) => void;

  computed: {
    activeDirectory: () => IridiumItem[];
    activePath: () => { name: string; id: string }[];
  };
}

/**
 * @description recursively crawl up the tree and build full file path
 */
function getLeadingPath(
  item?: IridiumItem
): { id: IridiumItem["id"]; name: IridiumItem["name"] }[] {
  if (!item) {
    return [];
  }
  const path = [{ id: item.id, name: item.name }];
  if (item.parentId) {
    const parent = fileManager.flat.find((i) => i.id === item.parentId);
    if (parent) {
      path.unshift(...getLeadingPath(parent));
    }
  }
  return path;
}

export const useFileStore = create<FileState>((set, get) => ({
  sort: {
    category: FileSortOptions.MODIFIED,
    asc: true,
  },
  activeDirectoryId: "",

  setSort: (sort) => set(() => ({ sort })),
  setActiveDirectoryId: (activeDirectoryId) =>
    set(() => ({ activeDirectoryId })),

  computed: {
    activeDirectory: () => {
      const activeDir = fileManager.flat.find(
        (item) => item.id === get().activeDirectoryId
      );
      if (activeDir && "children" in activeDir) {
        return activeDir.children;
      }
      return fileManager.state.items;
    },
    activePath: () =>
      getLeadingPath(
        fileManager.flat.find((item) => item.id === get().activeDirectoryId)
      ),
  },
}));
