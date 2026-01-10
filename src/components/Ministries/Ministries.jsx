import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Link,
  useDisclosure,
  addToast,
} from "@heroui/react";
import { useMinistries, useMinistryMutation } from "../../hooks/hooks";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { renderColorChip } from "../Commons";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import GroupDetail from "../GroupDetail";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import instance from "../../libs/axios/instance";

export default function Ministries() {
  const [ministry, setMinistry] = useState();
  const {
    isOpen: detailIsOpen,
    onOpen: detailOnOpen,
    onOpenChange: detailOnOpenChange,
  } = useDisclosure();
  const {
    data: ministries,
    isPending: isPendingMinistries,
    refetch,
  } = useMinistries();

  const handleDetail = (m) => {
    console.log("ministry", m);
    setMinistry(m);
    detailOnOpen();
  };

  const [name, setName] = useState();

  const { updateMutation, deleteMutation } = useMinistryMutation(
    ministry,
    detailOnOpenChange,
    refetch,
    name
  );

  if (!ministries) {
    return <Spinner />;
  }

  return (
    <div className="w-full xl:w-1/2">
      <Table
        isStriped
        isHeaderSticky
        topContent={
          <div className="flex flex-col w-full items-end gap-2">
            <Button
              variant="solid"
              color="primary"
              endContent={<AiOutlinePlus />}
            >
              Tambah
            </Button>
          </div>
        }
      >
        <TableHeader>
          <TableColumn key="ministries">Wadah</TableColumn>
          <TableColumn key="view" align="center">
            Lihat
          </TableColumn>
        </TableHeader>
        <TableBody
          items={ministries || []}
          isLoading={isPendingMinistries}
          loadingContent={<Spinner />}
        >
          {(ministry) => (
            <TableRow key={ministry._id}>
              <TableCell>{renderColorChip(ministries, ministry._id)}</TableCell>
              <TableCell align="center" className="flex justify-center">
                <IoMdInformationCircleOutline
                  onClick={() => handleDetail(ministry)}
                  size={20}
                  className="text-emerald-500 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <GroupDetail
        group={ministry}
        isOpen={detailIsOpen}
        onOpen={detailOnOpen}
        onOpenChange={detailOnOpenChange}
        handleDelete={deleteMutation.mutate}
        isDeleting={deleteMutation.isUpdating}
        handleUpdate={updateMutation.mutate}
        name={name}
        setName={setName}
      ></GroupDetail>
    </div>
  );
}
