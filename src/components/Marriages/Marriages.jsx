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
import { useMarriages, useParticipants } from "../../hooks/hooks";
import { AiOutlinePlus } from "react-icons/ai";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { useEffect, useState } from "react";
import MarriageForm from "./MarriageForm";
import { MarriageCreate } from "./MarriageCreate";
import { MarriageEdit } from "./MarriageEdit";

const columns = [
  {
    key: "husband",
    label: "Suami",
    width: 40,
  },
  {
    key: "wife",
    label: "Istri",
    width: 40,
  },
  {
    key: "marriage_date",
    label: "Tanggal Peneguhan",
    width: 10,
  },
  {
    key: "view",
    label: "",
    width: 10,
  },
];

export default function Marriages() {
  const { data: marriages, isPending } = useMarriages();
  const { data: participants } = useParticipants();
  const [marriage, setMarriage] = useState({
    husband: null,
    wife: null,
    marriage_date: null,
  });
  const [names, setNames] = useState();
  useEffect(() => {
    if (
      !marriage.husband ||
      !marriage.wife ||
      !marriage.marriage_date ||
      !participants
    )
      return;
    // console.log("mmm", marriage);
    const h = participants.filter(
      (p) => p._id === marriage.husband.participantId._id,
    )[0];
    const w = participants.filter(
      (p) => p._id === marriage.wife.participantId._id,
    )[0];
    // console.log("hw",h,w);
    setNames({
      husband: h.name,
      wife: w.name,
    });
  }, [marriage, participants]);
  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onOpenChange: createOnOpenChange,
  } = useDisclosure();

  const {
    isOpen: editIsOpen,
    onOpen: editOnOpen,
    onOpenChange: editOnOpenChange,
  } = useDisclosure();
  const handleDetail = (m) => {
    setMarriage(m);
    editOnOpen();
  };

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
          <IoMdInformationCircleOutline
            onClick={() => handleDetail(marriage)}
            size={20}
            className="text-emerald-500 cursor-pointer"
          />
        );
      default:
        return JSON.stringify(columnKey);
    }
  };

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
      />
      <Table isStriped isHeaderSticky aria-label="Marriage List">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn
              key={column.key}
              align={
                ["marriage_date", "view"].includes(column.key)
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
      <MarriageEdit
        isOpen={editIsOpen}
        onOpen={editOnOpen}
        onOpenChange={editOnOpenChange}
        marriage={marriage}
        names={names}
      />
    </div>
  );
}
