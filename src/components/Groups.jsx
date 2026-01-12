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
import { useEffect, useState } from "react";
import GroupDetail from "./GroupDetail";
import { renderColorChip } from "./Commons";
import { useGroupMutation, useGroups } from "../hooks/hooks";
import GroupCreate from "./GroupCreate";

export default function Groups({ label, slug }) {
  const [group, setGroup] = useState();
  const {
    isOpen: createIsOpen,
    onOpen: createOnOpen,
    onOpenChange: createOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: detailIsOpen,
    onOpen: detailOnOpen,
    onOpenChange: detailOnOpenChange,
  } = useDisclosure();
  const {
    data: groups,
    isPending: isPendingGroups,
    refetch,
  } = useGroups(slug, label);

  const handleDetail = (m) => {
    setGroup(m);
    detailOnOpen();
  };

  const [name, setName] = useState();
  const [payload, setPayload] = useState();

  useEffect(() => {
    setPayload({ name: name });
  }, [name]);

  const { createMutation, updateMutation, deleteMutation } = useGroupMutation(
    slug,
    label,
    group,
    createOnOpenChange,
    detailOnOpenChange,
    refetch,
    payload
  );

  if (!groups) {
    return <Spinner />;
  }

  return (
    <div className="w-full xl:w-1/2">
      <GroupCreate
        isOpen={createIsOpen}
        onOpen={createOnOpen}
        onOpenChange={createOnOpenChange}
        handleCreate={createMutation.mutate}
        // isCreating={createMutation.isCreating}
        name={name}
        setName={setName}
        label={label}
      />
      <Table
        isStriped
        isHeaderSticky
        topContent={
          <div className="flex flex-col w-full items-end gap-2">
            <Button
              variant="solid"
              color="primary"
              endContent={<AiOutlinePlus />}
              onPress={createOnOpen}
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
