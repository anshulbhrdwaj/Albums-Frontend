import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  useDisclosure,
  PopoverTrigger,
  PopoverContent,
  Popover,
} from "@nextui-org/react";
import {
  PlusIcon,
  VerticalDotsIcon,
  SearchIcon,
  ChevronDownIcon,
} from "../assets/Icons.jsx";
import { columns, statusOptions } from "./Albums/data.js";
import { capitalize, formatDate } from "../utils/utils.js";
import { styles } from "../assets/style.js";
import { useFetchAllAlbums } from "../hooks/useAlbums.js";
import Skeleton from "../components/Skeleton.jsx";
import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import NewAlbum from "../modals/NewAlbum.modal.jsx";
import Alert from "../components/Alert.jsx";
import EditAlbum from "../modals/EditAlbum.modal.jsx";
import ViewAlbum from "../modals/ViewAlbum.modal.jsx";
import Delete from "../modals/DeleteAlbum.modal.jsx";
import copy from "copy-to-clipboard";

const statusColorMap = {
  sweet: "success",
  intense: "danger",
  leaks: "warning",
};

const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "category",
  "mediaCount",
  "size",
  "botLink",
  "actions",
];

export default function Albums() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [sortDescriptor, setSortDescriptor] = useState({
    column: "age",
    direction: "ascending",
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const { data: albums, isLoading, error, refetch } = useFetchAllAlbums();

  const copyToClipboard = async (botLink) => {
    try {
      await navigator.clipboard.writeText(botLink);
      console.log("Copied to Clipboard");
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    if (albums && albums?.length > 0) {
      let filteredAlbums = [...albums];

      if (hasSearchFilter) {
        filteredAlbums = filteredAlbums.filter((album) =>
          album.albumName.toLowerCase().includes(filterValue.toLowerCase())
        );
      }
      if (
        statusFilter !== "all" &&
        Array.from(statusFilter).length !== statusOptions.length
      ) {
        filteredAlbums = filteredAlbums.filter((album) =>
          Array.from(statusFilter).includes(album.status)
        );
      }

      return filteredAlbums;
    }
  }, [albums, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems?.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems?.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return (
      items &&
      [...items].sort((a, b) => {
        const first = a[sortDescriptor.column];
        const second = b[sortDescriptor.column];
        const cmp = first < second ? -1 : first > second ? 1 : 0;

        return sortDescriptor.direction === "descending" ? -cmp : cmp;
      })
    );
  }, [sortDescriptor, items]);

  const renderCell = useCallback((album, columnKey) => {
    const cellValue = album[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ radius: "lg", src: album.avatar }}
            description={String(album.albumName).replace(/_/g, " ")}
            name={cellValue}
            className={`${styles["text-gradient-tbr"]}`}
          >
            {String(album.albumName).replace(/_/g, " ")}
          </User>
        );
      // case "id":
      //   return (
      //     <div className="flex flex-col justify-center">
      //       <p className="text-bold text-small capitalize">
      //         {String(album.albumName).replace(/_/g, " ")}
      //       </p>
      //       <p className="text-bold text-tiny capitalize text-default-400 cursor-pointer">
      //         {album._id}
      //       </p>
      //       <Popover
      //         key={album._id}
      //         placement="top"
      //         color={"foreground"}
      //         backdrop="opaque"
      //         isOpen={isOpen}
      //         onOpenChange={(open) => {
      //           setIsOpen(open);
      //           isOpen &&
      //             setTimeout(() => {
      //               setIsOpen(false);
      //             }, 1000);
      //         }}
      //       >
      //         <PopoverTrigger>
      //           <span
      //             className="material-symbols-rounded text-base cursor-pointer"
      //             onClick={async () => {
      //               try {
      //                 await navigator.clipboard.writeText(album._id);
      //                 console.log("Copied to clipboard");
      //               } catch (err) {
      //                 console.error("Failed to copy text: ", err);
      //               }
      //             }}
      //           >
      //             content_copy
      //           </span>
      //         </PopoverTrigger>
      //         <PopoverContent>
      //           <div className="px-1 py-2">
      //             <div className="text-small font-bold">
      //               Copied to clipboard!
      //             </div>
      //           </div>
      //         </PopoverContent>
      //       </Popover>
      //     </div>
      //   );
      case "mediaCount":
        return (
          <div className="flex">
            <p className="text-bold text-base capitalize text-default-400 justify-center">
              {album.media.length}
            </p>
          </div>
        );
      case "botLink":
        return (
          <div className="flex">
            <p
              className="text-bold text-base text-default-400 justify-center outline-none"
              contentEditable={true}
              suppressContentEditableWarning={true}
            >
              {album.botLink}
            </p>
            <Popover
              key={album.botLink}
              placement="top"
              color={"foreground"}
              backdrop="opaque"
            >
              <PopoverTrigger>
                <span
                  className="material-symbols-rounded text-base cursor-pointer hidden lg:flex"
                  onClick={() => copyToClipboard(album.botLink)}
                >
                  content_copy
                </span>
              </PopoverTrigger>

              <PopoverContent>
                <div className="px-1 py-2">
                  <div className="text-small font-bold">
                    Copied to clipboard!
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      case "createdAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize text-default-400 text-nowrap">
              {formatDate(album.createdAt)}
            </p>
          </div>
        );
      case "updatedAt":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize text-default-400 text-nowrap">
              {formatDate(album.updatedAt)}
            </p>
          </div>
        );
      case "size":
        return (
          <div className="flex">
            <p className="text-bold text-small capitalize mr-1">
              {cellValue.toFixed(2)}
            </p>
            <p className="text-bold text-small capitalize text-default-400">
              MB
            </p>
          </div>
        );
      case "category":
        return (
          <Chip
            className="capitalize"
            color={statusColorMap[album.status]}
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-center items-center gap-3">
            <ViewAlbum album={album} refetch={refetch} />
            <EditAlbum album={album} refetch={refetch} />
            <Delete album={album} refetch={refetch} />
            {/* <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon className="text-default-300" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem>View</DropdownItem>
                <DropdownItem>Edit</DropdownItem>
                <DropdownItem>Delete</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-6 md:gap-4 ">
        <div className="flex justify-between gap-3 items-center">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            {/* <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {capitalize(status.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown> */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {capitalize(column.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <div className="hidden md:flex">
              <NewAlbum refetch={refetch} />
            </div>
          </div>
        </div>
        <div className="md:hidden flex w-full">
          <NewAlbum refetch={refetch} />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {albums?.length} albums
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="10">10</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="99999999999999999">All</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    albums?.length,
    onSearchChange,
    hasSearchFilter,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center ">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems?.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items?.length, page, pages, hasSearchFilter]);

  return isLoading ? (
    <Skeleton />
  ) : (
    <Table
      aria-label="Example table with custom cells, pagination and sorting"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      className={`h-[90vh] max-lg:mt-2 lg:h-[98vh] w-[95%] lg:w-[87.5%] md:px-4 md:py-8 px-3 py-4 flex justify-between ${styles["bg-secondary"]} rounded-lg`}
      // selectedKeys={selectedKeys}
      // selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      // onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader columns={headerColumns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            className={`${
              column.uid === "actions" ? "text-center" : `text-start`
            }`}
            allowsSorting={column.sortable}
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody emptyContent={"No Albums found"} items={sortedItems || []}>
        {(item) => (
          <TableRow key={item._id}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
