import {
  Alert,
  Button,
  Link,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { useMarriages } from "../../hooks/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useState } from "react";
import MarriageCreate from "./MarriageCreate";

const columns = [
  {
    key: "husband",
    label: "Suami",
    width: 10,
  },
  {
    key: "wife",
    label: "Istri",
    width: 10,
  },
  {
    key: "marriage_date",
    label: "Tanggal Peneguhan",
    width: 10,
  },
  {
    key: "view",
    label: "Lihat",
    width: 10,
  },
];

export default function Marriages() {
  const { data: marriages, isPending } = useMarriages();

  const renderCell = (marriage, columnKey) => {
    switch (columnKey) {
      case "husband":
        return marriage.husband.participantId.name;
      case "wife":
        return marriage.wife.participantId.name;
      case "marriage_date":
        return marriage.marriage_date;
      case "view":
        return (
          <Link href={`/jemaat/${marriage._id}`}>
            <IoMdInformationCircleOutline />
          </Link>
        );
      default:
        return JSON.stringify(columnKey);
    }
  };

  const [marriage, setMarriage] = useState();
  const [husband, setHusband] = useState("");
  const [marriageDate, setMarriageDate] = useState("");
  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onOpenChange: createOnOpenChange,
  } = useDisclosure();

  return (
    <div className="w-full xl:w-3/4">
      <div className="flex w-full justify-between mb-4">
        <Alert color="danger">Data masih contoh random</Alert>
        <Button
          variant="solid"
          color="primary"
          endContent={<AiOutlinePlus />}
          onPress={createOnOpen}
        >
          Tambah Pernikahan Baru
        </Button>
      </div>
      <MarriageCreate
        isOpen={createIsOpen}
        onOpen={createOnOpen}
        onOpenChange={createOnOpenChange}
        // handleCreate={}
        husband={husband}
        setHusband={setHusband}
        marriageDate={marriageDate}
        setMarriageDate={setMarriageDate}
      />
      <Table isStriped isHeaderSticky>
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
          items={marriages || []}
          isLoading={isPending}
          loadingContent={<Spinner />}
        >
          {(marriage) => (
            <TableRow key={marriage._id}>
              {(columnKey) => (
                <TableCell>{renderCell(marriage, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
