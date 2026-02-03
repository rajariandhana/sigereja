import {
  Autocomplete,
  AutocompleteItem,
  Button,
  DatePicker,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@heroui/react";
import { change } from "../Commons";
import { useParticipants } from "../../hooks/hooks";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi";

export default function MarriageForm({
  form,
  setForm,
  mode,
  isOpen,
  onOpen,
  onOpenChange,
  onSubmit,
  isSubmitting,
  onDelete,
  isDeleting,
  marriage,
}) {
  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));
  const { data: participants } = useParticipants();

  const [men, setMen] = useState([]);
  const [women, setWomen] = useState([]);

  useEffect(() => {
    if (!participants) return;

    const men = [];
    const women = [];

    participants.forEach(({ _id, name, gender }) => {
      const simplified = { _id, name };
      if (gender === "pria") men.push(simplified);
      if (gender === "wanita") women.push(simplified);
    });

    setMen(men);
    setWomen(women);
  }, [participants]);

  if (!participants) {
    return <Spinner />;
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              {mode === "create" ? "Tambah Pernikahan" : "Ubah Data Pernikahan"}
            </ModalHeader>
            <ModalBody>
              {/* <span>Form: {JSON.stringify(form)}</span> */}
              <Autocomplete
                label="Suami"
                defaultItems={men}
                placeholder="Temukan nama suami"
                variant="faded"
                selectedKey={form.husband}
                onSelectionChange={update("husband")}
                isRequired
              >
                {(item) => (
                  <AutocompleteItem key={item._id}>
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <Autocomplete
                label="Istri"
                defaultItems={women}
                placeholder="Temukan nama istri"
                variant="faded"
                selectedKey={form.wife}
                onSelectionChange={update("wife")}
                isRequired
              >
                {(item) => (
                  <AutocompleteItem key={item._id}>
                    {item.name}
                  </AutocompleteItem>
                )}
              </Autocomplete>
              <DatePicker
                label="Tanggal Peneguhan Pernikahan"
                value={form.marriage_date}
                onChange={update("marriage_date")}
                showMonthAndYearPickers
                selectorButtonPlacement="start"
                variant="faded"
                isRequired
                description={
                  marriage ? (
                    change(marriage.marriage_date, form.marriage_date)
                  ) : (
                    <></>
                  )
                }
              />
            </ModalBody>
            <ModalFooter>
              <div
                className={`w-full flex ${mode === "edit" ? "justify-between" : "justify-end"}`}
              >
                {mode === "edit" && (
                  <Button
                    color="danger"
                    variant="ghost"
                    onPress={onDelete}
                    isLoading={isDeleting}
                  >
                    <HiOutlineTrash size={20} />
                    Hapus Pernikahan
                  </Button>
                )}
                <Button
                  color="primary"
                  variant="ghost"
                  onPress={onSubmit}
                  isLoading={isSubmitting}
                >
                  Simpan Data
                </Button>
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
