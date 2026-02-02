import { Modal, useDisclosure } from "@heroui/react";
import { formatDateTimeID } from "../../utils/util";
import { change } from "../Commons";

export default function MarriageForm({
  marriage,
  isOpen, onOpen, onOpenChange,
  husband,
  setHusband,
  marriageDate,
  setMarriageDate,
  handleUpdate,
  handleDelete,
  isDeleting,
  label
}) {
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
                label="Suami"
                value={husband}
                onValueChange={setHusband}
                variant="faded"
                description={change(marriage.husband, husband)}
              />
              {/* <span className="text-sm">
                Terakhir diubah: {formatDateTimeID(marriage.updatedAt)}
              </span> */}
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
  )
}