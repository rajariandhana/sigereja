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
  Select,
  SelectItem,
  useDisclosure,
  ModalFooter,
  ModalBody,
  Modal,
  ModalContent,
  ModalHeader,
  Slider,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { SearchIcon } from "./example";
import { renderColorChips, renderGender } from "../Commons";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { calculateAge, genders } from "../../utils/util";
import GroupSelect from "../GroupSelect";
import {
  useMinistries,
  useParticipants,
  usePrayerGroups,
} from "../../hooks/hooks";
import { IoFilterCircleOutline } from "react-icons/io5";

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
  const { data: participants, isPending, refetch } = useParticipants();
  const { data: ministries, isPending: isPendingMinistries } = useMinistries();
  const { data: prayerGroups, isPending: isPendingPrayerGroups } =
    usePrayerGroups();

  const [filteredItems, setFilteredItems] = useState([]);
  const [shownItems, setShownItems] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [inputRowsPerPage, setInputRowsPerPage] = useState("20");
  const [ageOption, setAgeOption] = useState(null);
  const [age, setAge] = useState(50);
  const [ageRange, setAgeRange] = useState([0, 100]);
  const [selectedGender, setSelectedGender] = useState([]);
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [selectedPrayerGroups, setSelectedPrayerGroups] = useState([]);

  const {
    isOpen: filterIsOpen,
    onOpen: filterOnOpen,
    onOpenChange: filterOnOpenChange,
  } = useDisclosure();

  useEffect(() => {
    if (!participants) return;

    const withAge = participants.map((participant) => ({
      ...participant,
      age: calculateAge(participant.birth_date),
    }));

    setFilteredItems(withAge);
  }, [participants]);

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
    // Age filter
    if (ageOption) {
      if (ageOption === "range") {
        filtered = filtered.filter(
          (p) => p.age >= ageRange[0] && p.age <= ageRange[1]
        );
      }

      if (ageOption === "below") {
        filtered = filtered.filter((p) => p.age < age);
      }

      if (ageOption === "equal") {
        filtered = filtered.filter((p) => p.age === age);
      }

      if (ageOption === "above") {
        filtered = filtered.filter((p) => p.age > age);
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
    ageOption,
    age,
    ageRange,
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
          <Link href={`/jemaat/${participant._id}`}>
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
    if (!ageOption) {
      setAge(50);
      setAgeRange([0, 100]);
    }
  }, [ageOption]);

  if (!ministries || !prayerGroups) {
    return <Spinner />;
  }

  return (
    <div className="w-full xl:w-3/4">
      {/* <Button onPress={refetch} color="primary">Refetch</Button> */}
      {/* <div className="flex flex-col w-full justify-between gap-4 mb-6">
        <div className="flex gap-x-4">
          <div className="w-fit">
            
          </div>
        </div>
      </div> */}
      <Table
        isStriped
        isHeaderSticky
        topContent={
          <div className="flex flex-col w-full gap-2">
            <div className="w-full flex justify-between items-center text-sm">
              <Input
                isClearable
                className="w-fit"
                placeholder="Cari berdasarkan nama"
                startContent={<SearchIcon />}
                value={nameFilter}
                onClear={() => setNameFilter("")}
                onValueChange={setNameFilter}
                variant="faded"
              />
              <div>
                <Button
                  variant="faded"
                  endContent={<IoFilterCircleOutline />}
                  onPress={filterOnOpen}
                >
                  Filter
                </Button>
                <Modal isOpen={filterIsOpen} onOpenChange={filterOnOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader>Filter Jemaat</ModalHeader>
                        <ModalBody className="items-start">
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
                          <div className="w-full flex gap-4">
                            <Select
                              label="Jenis Kelamin"
                              selectionMode="single"
                              selectedKeys={[selectedGender]}
                              onChange={(e) =>
                                setSelectedGender(e.target.value)
                              }
                              items={genders}
                              renderValue={(items) => {
                                return items.map((item) => (
                                  <span key={item.key}>
                                    {renderGender(item.data.key)}
                                  </span>
                                ));
                              }}
                              variant="faded"
                              isClearable={true}
                              className="w-1/2"
                              size="sm"
                            >
                              {(g) => (
                                <SelectItem key={g.key}>
                                  {renderGender(g.key)}
                                </SelectItem>
                              )}
                            </Select>
                            <Select
                              label="Usia"
                              selectionMode="single"
                              // selectedKeys={[ageOption]}
                              onChange={(e) => setAgeOption(e.target.value)}
                              variant="faded"
                              className="w-1/2"
                              size="sm"
                              isClearable
                            >
                              <SelectItem key="range">Jangkauan</SelectItem>
                              <SelectItem key="below">Di bawah</SelectItem>
                              <SelectItem key="equal">Sama dengan</SelectItem>
                              <SelectItem key="above">Di atas</SelectItem>
                            </Select>
                          </div>
                          {ageOption &&
                            (ageOption === "range" ? (
                              <Slider
                                label="Pilih jangkauan usia"
                                minValue={0}
                                maxValue={100}
                                value={ageRange}
                                onChange={setAgeRange}
                                className="w-full"
                              />
                            ) : (
                              <Slider
                                label="Pilih usia"
                                minValue={0}
                                maxValue={100}
                                value={age}
                                onChange={setAge}
                              />
                            ))}
                        </ModalBody>
                        <ModalFooter>
                          <Button variant="faded" onPress={onClose}>
                            Tutup
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </div>
            </div>
            <div className="w-full flex justify-between items-center text-sm">
              <span>
                Menampilkan {shownItems.length} / {filteredItems.length}
              </span>
              <Select
                label="Jumlah Baris / Halaman"
                selectedKeys={new Set([inputRowsPerPage])}
                onSelectionChange={(keys) => setInputRowsPerPage([...keys][0])}
                variant="faded"
                labelPlacement="outside-left"
                className="w-82"
                size="sm"
              >
                {numberOfRows.map((page) => (
                  <SelectItem key={page.key}>{page.label}</SelectItem>
                ))}
              </Select>
            </div>
          </div>
        }
        bottomContent={
          <div className="w-full justify-end flex">
            <Pagination
              isCompact
              showControls
              showShadow
              page={page}
              total={pages}
              onChange={(page) => setPage(page)}
            />
          </div>
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
