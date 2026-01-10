import {
  Button,
  Code,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { HiOutlineTrash } from "react-icons/hi";

export default function ConfirmDelete({
  isOpen,
  onOpen,
  onOpenChange,
  handleDelete,
  isDeleting,
  label,
  toDelete,
  description,
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Konfirmasi Penghapusan</ModalHeader>
            <ModalBody>
              <p>Anda akan menghapus data {label}:</p>
              <Code>{toDelete}</Code>
              <p>
                {description
                  ? description
                  : "Data yang dihapus tidak akan bisa dikembalikan. Apakah anda yakin?"}
              </p>
            </ModalBody>
            <ModalFooter className="justify-between">
              <Button variant="shadow" onPress={onClose}>
                Kembali
              </Button>
              <Button
                color="danger"
                variant="ghost"
                onPress={handleDelete}
                isLoading={isDeleting}
                isDisabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Spinner color="danger" />
                    "Menghapus..."
                  </>
                ) : (
                  <>
                    <HiOutlineTrash size={20} />
                    Hapus {label}
                  </>
                )}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
