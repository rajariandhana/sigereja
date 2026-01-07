import { useQuery, useQueryClient } from "@tanstack/react-query";
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
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  NumberInput,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "./example";
import { renderColorChip, renderColorChips, renderGender } from "../Commons";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { calculateAge, genders } from "../../utils/util";
import GroupSelect from "../GroupSelect";

const columns = [
  {
    key: "name",
    label: "Nama Jemaat",
    width: 40,
  },
  {
    key: "age",
    label: "Usia",
    width: 10,
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
    key: "gender",
    label: "Jenis Kelamin",
    width: 10,
  },
  {
    key: "view",
    label: "Lihat",
    width: 10,
  },
];

const numberOfRows = [
  { key: "10", label: "10" },
  { key: "20", label: "20" },
  { key: "50", label: "50" },
  { key: "100", label: "100" },
  { key: "all", label: "Tunjukkan Semua" },
];

export default function Participants() {
  const queryClient = useQueryClient();
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
    select: (participants) => {
      participants.forEach((p) =>
        queryClient.setQueryData(["participants", p.id], p)
      );
      return participants;
    },
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
  const [age, setAge] = useState();
  const [minAge, setMinAge] = useState();
  const [maxAge, setMaxAge] = useState();
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [selectedPrayerGroups, setSelectedPrayerGroups] = useState([]);

  useEffect(() => {
    if (!participants) return;

    const withAge = participants.map((participant) => ({
      ...participant,
      age: calculateAge(participant.birth_date),
    }));

    setFilteredItems(withAge);
  }, [participants]);

  // useEffect(() => {
  //   if (!ministries) return;
  //   setSelectedMinistries(ministries.map((ministry) => ministry._id));
  // }, [ministries]);

  useEffect(() => {
    if (!participants) return;

    let filtered = participants.map((participant) => ({
      ...participant,
      age: calculateAge(participant.birth_date),
    }));

    // Name filter
    if (nameFilter) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Exact age filter (takes priority)
    if (age !== undefined && age !== null) {
      filtered = filtered.filter((p) => p.age === age);
    }
    // Age range filter
    else {
      if (minAge !== undefined && minAge !== null) {
        filtered = filtered.filter((p) => p.age >= minAge);
      }
      if (maxAge !== undefined && maxAge !== null) {
        filtered = filtered.filter((p) => p.age <= maxAge);
      }
    }

    if (selectedGender === "pria" || selectedGender === "wanita") {
      filtered = filtered.filter((p) => p.gender === selectedGender);
    }

    if (
      selectedMinistries.length > 0 &&
      selectedMinistries.length < ministries.length
    ) {
      const selectedKeys = selectedMinistries.map((m) => m.ministryId);
      filtered = filtered.filter((p) =>
        p.ministries.some((m) => selectedKeys.includes(m.ministryId._id))
      );
    }

    if (
      selectedPrayerGroups.length > 0 &&
      selectedPrayerGroups.length < prayerGroups.length
    ) {
      const selectedKeys = selectedPrayerGroups.map((m) => m.prayerGroupId);
      filtered = filtered.filter((p) =>
        p.prayerGroups.some((m) => selectedKeys.includes(m.prayerGroupId._id))
      );
    }

    setFilteredItems(filtered);
  }, [
    participants,
    nameFilter,
    age,
    minAge,
    maxAge,
    selectedGender,
    selectedMinistries,
    ministries,
    selectedPrayerGroups,
    prayerGroups,
  ]);

  useEffect(() => {
    if (!filteredItems) return;
    setPage(1);
    const nPages = Math.ceil(filteredItems.length / rowsPerPage);
    setPages(nPages);
  }, [filteredItems, rowsPerPage]);
  useEffect(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    setShownItems(filteredItems.slice(start, end));
  }, [page, filteredItems, rowsPerPage]);

  const renderCell = (participant, columnKey) => {
    // const cellValue = participant[columnKey];
    switch (columnKey) {
      case "name":
        return participant.name;
      case "age": {
        return participant.age;
      }
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
      case "gender":
        return renderGender(participant.gender);
      case "view":
        return (
          <Link href={`/participants/${participant._id}`}>
            <IoMdInformationCircleOutline />
          </Link>
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
  useEffect(() => {
    if (age !== undefined && age !== null) {
      setMinAge(undefined);
      setMaxAge(undefined);
    }
  }, [age]);
  useEffect(() => {
    if (minAge !== undefined || maxAge !== undefined) {
      setAge(undefined);
    }
  }, [minAge, maxAge]);

  if (!ministries || !prayerGroups) {
    return <Spinner />;
  }

  return (
    <div className="w-full xl:w-3/4">
      {/* <Button onPress={refetch} color="primary">Refetch</Button> */}
      <div className="flex flex-col w-full justify-between gap-4 mb-6">
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
          label="Jumlah Baris / Halaman"
          selectedKeys={new Set([inputRowsPerPage])}
          onSelectionChange={(keys) => setInputRowsPerPage([...keys][0])}
          className="w-50"
        >
          {numberOfRows.map((page) => (
            <SelectItem key={page.key}>{page.label}</SelectItem>
          ))}
        </Select>
        <div className="flex gap-x-4">
          <div className="w-fit">
            <div>
              Usia tepat
              <NumberInput
                className="w-20"
                description="Usia"
                value={age}
                onValueChange={setAge}
                minValue={0}
              />
            </div>
            <div>
              Jangkauan Usia
              <div className="flex gap-x-4">
                <NumberInput
                  className="w-20"
                  description="Minimum"
                  value={minAge}
                  onValueChange={setMinAge}
                  minValue={0}
                />
                <NumberInput
                  className="w-20"
                  description="Maksimum"
                  value={maxAge}
                  onValueChange={setMaxAge}
                  minValue={0}
                />
              </div>
            </div>
          </div>
          <GroupSelect
            label="Wadah"
            type="ministries"
            options={ministries}
            selecteds={selectedMinistries}
            setSelecteds={setSelectedMinistries}
            isClearable={true}
          />
          <GroupSelect
            label="Kelompok Doa"
            type="prayerGroups"
            options={prayerGroups}
            selecteds={selectedPrayerGroups}
            setSelecteds={setSelectedPrayerGroups}
            isClearable={true}
          />
          <Select
            label="Jenis Kelamin"
            selectionMode="single"
            selectedKeys={[selectedGender]}
            onChange={(e) => setSelectedGender(e.target.value)}
            items={genders}
            renderValue={(items) => {
              return items.map((item) => (
                <span key={item.key}>{renderGender(item.data.key)}</span>
              ));
            }}
            variant="faded"
            isClearable={true}
          >
            {(g) => <SelectItem key={g.key}>{renderGender(g.key)}</SelectItem>}
          </Select>
          {/* <CheckboxGroup
            value={selectedGenders}
            onValueChange={setSelectedGenders}
          >
            Gender
            <Checkbox value="pria">{renderGender("pria")}</Checkbox>
            <Checkbox value="wanita">{renderGender("wanita")}</Checkbox>
          </CheckboxGroup> */}
        </div>
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
        topContent={
          <>
            Menampilkan {shownItems.length} / {filteredItems.length}
          </>
        }
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                ["age", "gender", "view"].includes(column.key)
                  ? "center"
                  : "start"
              }
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
