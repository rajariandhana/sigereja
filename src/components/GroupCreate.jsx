import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { useEffect } from "react";

export default function GroupCreate({
  isOpen,
  onOpen,
  onOpenChange,
  handleCreate,
  // isCreating,
  name,
  setName,
  label,
}) {
  useEffect(() => {
    if (isOpen === true) {
      setName("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Tambah {label}</ModalHeader>
            <ModalBody>
              <Input
                label="Nama"
                value={name}
                onValueChange={setName}
                variant="faded"
              />
            </ModalBody>
            <ModalFooter>
              <div className="w-full flex justify-end">
                <Button color="primary" variant="ghost" onPress={handleCreate}>
                  Buat
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
