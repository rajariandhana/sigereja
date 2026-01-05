import { useQuery } from "@tanstack/react-query";
import instance from "../../libs/axios/instance";
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Link,
  Button,
  Input,
  Pagination,
  User,
  Select,
  SelectItem,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "./example";

const columns = [
  {
    key: "name",
    label: "Nama",
    width: 40,
  },
  {
    key: "ministries",
    label: "Wadah",
    width: 40,
  },
  {
    key: "prayer-groups",
    label: "Kelompok Doa",
    width: 40,
  },
  {
    key: "view",
    label: "VIEW",
    width: 10,
  },
];

const numberOfRows = [
  { key: "10", label: "10" },
  { key: "20", label: "20" },
  { key: "50", label: "50" },
  { key: "100", label: "100" },
  { key: "all", label: "Tunjukkan Semua Baris" },
];

export default function Participants() {
  const fetchParticipants = async () => {
    try {
      const response = await instance.get(`/participants`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching participants:", error);
    } finally {
      console.log("Participants fetch attempt finished.");
    }
  };
  const {
    data: participants,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
  });

  const fetchMinistries = async () => {
    try {
      const response = await instance.get(`/ministries`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching Ministries:", error);
    } finally {
      console.log("Ministries fetch attempt finished.");
    }
  };
  const { data: ministries, isPending: isPendingMinistries } = useQuery({
    queryKey: ["ministries"],
    queryFn: fetchMinistries,
  });
  const fetchPrayerGroups = async () => {
    try {
      const response = await instance.get(`/prayer-groups`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching PrayerGroups:", error);
    } finally {
      console.log("PrayerGroups fetch attempt finished.");
    }
  };
  const { data: prayerGroups, isPending: isPendingPrayerGroups } = useQuery({
    queryKey: ["prayer-groups"],
    queryFn: fetchPrayerGroups,
  });

  const [filteredItems, setFilteredItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [inputRowsPerPage, setInputRowsPerPage] = useState("20");

  useEffect(() => {
    if (!participants) return;
    setFilteredItems(participants);
  }, [participants]);
  useEffect(() => {
    if (!participants) return;
    if (!nameFilter) {
      setFilteredItems(participants);
      return;
    }
    const filtered = participants.filter((participant) =>
      participant.name.toLowerCase().includes(nameFilter.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [nameFilter, participants]);
  useEffect(() => {
    if (!filteredItems) return;
    setPage(1);
    const nPages = Math.ceil(filteredItems.length / rowsPerPage);
    console.log("nPages", nPages);
    setPages(nPages);
  }, [filteredItems, rowsPerPage]);
  useEffect(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setShownItems(filteredItems.slice(start, end));
  }, [page, filteredItems, rowsPerPage]);

  const renderColorChip = (mapping, id) => {
    const { name, color } = mapping.find((m) => m._id === id);
    return (
      <span
        className={`bg-${color}-100 text-${color}-500 text-xs rounded-full px-2 py-1`}
      >
        {name}
      </span>
    );
  };
  const renderColorChips = (ls, mapping, type) => {
    return (
      <span className="flex flex-wrap gap-2">
        {ls.map((l) =>
          renderColorChip(
            mapping,
            type === "ministries" ? l.ministryId._id : l.prayerGroupId._id
          )
        )}
      </span>
    );
  };
  const renderCell = (participant, columnKey) => {
    // const cellValue = participant[columnKey];
    switch (columnKey) {
      case "name":
        return participant.name;
      case "ministries":
        return renderColorChips(
          participant.ministries,
          ministries,
          "ministries"
        );
      case "prayer-groups":
        return renderColorChips(
          participant.prayerGroups,
          prayerGroups,
          "prayer-groups"
        );
      default:
        return JSON.stringify(columnKey);
    }
  };

  useEffect(() => {
    if (!inputRowsPerPage) return;
    if (inputRowsPerPage === "all") {
      setRowsPerPage(filteredItems?.length || Infinity); // show all
    } else {
      const n = parseInt(inputRowsPerPage, 10);
      if (!isNaN(n) && n > 0) setRowsPerPage(n);
    }
  }, [inputRowsPerPage, filteredItems]);

  if (!ministries || !prayerGroups) {
    return <Spinner />;
  }

  return (
    <div className="w-3/4">
      {/* <Button onPress={refetch} color="primary">Refetch</Button> */}
      <div className="flex flex-col w-full justify-between gap-4">
        <Input
          isClearable
          className="w-fit"
          placeholder="Cari berdasarkan nama"
          startContent={<SearchIcon />}
          value={nameFilter}
          onClear={() => setNameFilter("")}
          onValueChange={setNameFilter}
        />
        <Select
          label="Jumlah Baris"
          selectedKeys={new Set([inputRowsPerPage])}
          onSelectionChange={(keys) => setInputRowsPerPage([...keys][0])}
        >
          {numberOfRows.map((page) => (
            <SelectItem key={page.key}>{page.label}</SelectItem>
          ))}
        </Select>
        <Pagination
          isCompact
          showControls
          showShadow
          page={page}
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>
      <Table
        // fullWidth={true}
        // className="w-full"
        isStriped
        isHeaderSticky
        topContent={<></>}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={column.key === "view" ? "center" : "start"}
              allowsSorting={column.sortable}
              width={column.width}
              minWidth={column.width}
              maxWidth={column.width}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          items={shownItems || []}
          isLoading={isPending}
          loadingContent={<Spinner />}
        >
          {(participant) => (
            <TableRow key={participant._id}>
              {(columnKey) => (
                <TableCell>{renderCell(participant, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
