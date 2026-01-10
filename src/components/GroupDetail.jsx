import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";
import { useEffect } from "react";
import { change } from "./Commons";
import { formatDateTimeID } from "../utils/util";
import { HiOutlineTrash } from "react-icons/hi";
import ConfirmDelete from "./ConfirmDelete";

export default function GroupDetail({
  group,
  isOpen,
  onOpen,
  onOpenChange,
  handleUpdate,
  handleDelete,
  isDeleting,
  name,
  setName,
  label,
}) {
  useEffect(() => {
    if (!group) return;
    setName(group.name);
  }, [group]);

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onOpenChange: confirmOnOpenChange,
  } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Ubah Data</ModalHeader>
            <ModalBody>
              <Input
                label="Nama"
                value={name}
                onValueChange={setName}
                variant="faded"
                description={change(group.name, name)}
              />
              <span className="text-sm">
                Terakhir diubah: {formatDateTimeID(group.updatedAt)}
              </span>
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex items-center justify-between">
                <Button color="danger" variant="ghost" onPress={confirmOnOpen}>
                  <HiOutlineTrash size={20} />
                  Hapus
                </Button>
                <div className="gap-x-2">
                  <Button
                    color="warning"
                    variant="ghost"
                    onPress={handleUpdate}
                  >
                    Simpan Perubahan
                  </Button>
                </div>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
      <ConfirmDelete
        isOpen={confirmIsOpen}
        onOpen={confirmOnOpen}
        onOpenChange={confirmOnOpenChange}
        handleDelete={handleDelete}
        isDeleting={isDeleting}
        label={label}
        toDelete={name}
      ></ConfirmDelete>
    </Modal>
  );
}
