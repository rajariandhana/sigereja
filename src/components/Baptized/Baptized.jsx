import {
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useParticipants } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";
const columns = [
  {
    key: "name",
    label: "Nama Jemaat",
  },
  {
    key: "parent_name",
    label: "Nama Orang Tua",
  },
  {
    key: "baptized_by",
    label: "Dibaptis Oleh",
  },
  {
    key: "baptized_date",
    label: "Tanggal Baptis",
  },
  {
    key: "view",
    label: "",
  },
];
export default function Baptized() {
  const { data: participants, isPending } = useParticipants();
  const [baptized, setBaptized] = useState([]);
  useEffect(() => {
    if (!participants) return;
    const filtered = participants
      .filter((p) => p.baptized === true)
      .map(
        ({
          address,
          birth_place,
          birth_date,
          phone,
          gender,
          notes,
          ministries,
          prayerGroups,
          createdAt,
          updatedAt,
          ...rest
        }) => rest,
      );
    setBaptized(filtered);
  }, [participants]);

  const renderCell = (participant, columnKey) => {
    // const cellValue = participant[columnKey];
    switch (columnKey) {
      case "name":
        return participant.name;
      case "parent_name":
        return participant.parent_name ?? "";
      case "baptized_by":
        return participant.baptized_by ?? "";
      case "baptized_date":
        return participant.baptized_date ?? "";
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
  if (!participants || !baptized) {
    return <Spinner />;
  }
  return (
    <Table isStriped isHeaderSticky aria-label="Tabel Baptis">
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.key}
            align={
              ["baptized_date", "view"].includes(column.key)
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
        items={baptized || []}
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
  );
}
