import {
  Button,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import GroupDetail from "./GroupDetail";
import { renderColorChip } from "./Commons";

export default function Groups({ useGroups, useGroupMutation, label, slug }) {
  const [group, setGroup] = useState();
  const {
    isOpen: detailIsOpen,
    onOpen: detailOnOpen,
    onOpenChange: detailOnOpenChange,
  } = useDisclosure();
  const { data: groups, isPending: isPendingGroups, refetch } = useGroups();

  const handleDetail = (m) => {
    setGroup(m);
    detailOnOpen();
  };

  const [name, setName] = useState();

  const { updateMutation, deleteMutation } = useGroupMutation(
    group,
    detailOnOpenChange,
    refetch,
    name
  );

  if (!groups) {
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
          <TableColumn key={slug}>{label}</TableColumn>
          <TableColumn key="view" align="center">
            Lihat
          </TableColumn>
        </TableHeader>
        <TableBody
          items={groups || []}
          isLoading={isPendingGroups}
          loadingContent={<Spinner />}
        >
          {(group) => (
            <TableRow key={group._id}>
              <TableCell>{renderColorChip(groups, group._id)}</TableCell>
              <TableCell align="center" className="flex justify-center">
                <IoMdInformationCircleOutline
                  onClick={() => handleDetail(group)}
                  size={20}
                  className="text-emerald-500 cursor-pointer"
                />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <GroupDetail
        group={group}
        isOpen={detailIsOpen}
        onOpen={detailOnOpen}
        onOpenChange={detailOnOpenChange}
        handleDelete={deleteMutation.mutate}
        isDeleting={deleteMutation.isUpdating}
        handleUpdate={updateMutation.mutate}
        name={name}
        setName={setName}
        label={label}
      ></GroupDetail>
    </div>
  );
}
