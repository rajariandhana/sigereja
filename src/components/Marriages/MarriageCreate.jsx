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

export default function MarriageCreate({
  isOpen,
  onOpen,
  onOpenChange,
  handleCreate,
  // isCreating,
  husband,
  setHusband,
  marriageDate,
  setMarriageDate,
}) {
  useEffect(() => {
    if (isOpen === true) {
      setHusband("");
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Tambah Pernikahan</ModalHeader>
            <ModalBody>
              <Input
                label="Suami"
                value={husband}
                onValueChange={setHusband}
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
