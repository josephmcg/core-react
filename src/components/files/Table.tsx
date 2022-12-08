import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { FC, KeyboardEvent } from "react";
import { useFileStore } from "~/store/files";
import { IridiumItem } from "~/types/file";
import { fileIconMap } from "~/utils/files";

const columnHelper = createColumnHelper<IridiumItem>();

const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: () => "Name",
    cell: (info) => {
      const type: IridiumItem["type"] = info.row.getValue("type");
      return (
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 text-dark">{fileIconMap[type]}</span>
          <span className="truncate">{info.renderValue()}</span>
        </div>
      );
    },
  }),
  columnHelper.accessor("size", {
    id: "size",
    header: () => "Size",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("type", {
    id: "type",
    header: () => "Type",
    cell: (info) => info.renderValue(),
  }),
];

export const FileTable: FC = () => {
  const { setActiveDirectoryId } = useFileStore();
  const activeDirectory = useFileStore((s) => s.computed.activeDirectory());

  const handleKeyDown = (
    event: KeyboardEvent<HTMLTableRowElement>,
    item: IridiumItem
  ) => {
    if (event.key === "Enter") {
      handleSelection(item);
    }
  };

  const handleSelection = (item: IridiumItem) => {
    "children" in item
      ? setActiveDirectoryId(item.id)
      : console.log("selected file" + item);
  };

  const table = useReactTable({
    data: activeDirectory,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return !activeDirectory.length ? (
    <div>Selected folder has no children</div>
  ) : (
    <table
      className="w-full table-fixed border-separate border-spacing-1"
      role="grid"
    >
      <colgroup>
        <col span={1} className="w-[66%]" />
        <col span={1} />
        <col span={1} />
      </colgroup>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                scope="col"
                className="sticky top-0 z-10 border-b bg-secondary-900 py-3 text-left text-sm first-of-type:pl-12"
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr
            key={row.id}
            tabIndex={0}
            onKeyDown={(event) => handleKeyDown(event, row.original)}
            onClick={() => handleSelection(row.original)}
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="truncate border-b py-3 first-of-type:pl-4"
                title={cell.getValue<string>()}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
