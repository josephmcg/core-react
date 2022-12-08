import { MOCK_ITEMS } from "~/mock";
import { IridiumItem } from "~/types/file";

type State = {
  items: IridiumItem[];
};

class FileManager {
  state: State = { items: MOCK_ITEMS };

  /**
   * @returns {IridiumItem[]} flattened list of items
   */
  get flat(): IridiumItem[] {
    return this.flatDeep(this.state.items);
  }

  /**
   * @returns {number} total size of all tracked files
   */
  get totalSize(): number {
    return this.flat.reduce((total, curr) => total + curr.size, 0);
  }

  /**
   * @description recursively flattens all directories
   * @param {IridiumItem[]} list current directory items (starting with root, then calls itself when a nested dir is found)
   * @returns {IridiumItem[]} flattened list of files and directories
   */
  private flatDeep(list: IridiumItem[]): IridiumItem[] {
    return list.reduce((prev: IridiumItem[], curr) => {
      prev.push(curr);
      if ("children" in curr) {
        prev.push(...this.flatDeep(curr.children));
      }
      return prev;
    }, []);
  }
}

const fileManager = new FileManager();
export { fileManager };
