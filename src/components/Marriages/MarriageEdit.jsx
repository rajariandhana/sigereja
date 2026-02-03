import { useDisclosure } from "@heroui/react";
import { useMarriageForm, useMarriageMutation } from "../../hooks/hooks";
import MarriageForm from "./MarriageForm";
import ConfirmDelete from "../ConfirmDelete";

export function MarriageEdit({ isOpen, onOpenChange, marriage, names }) {
  const [form, setForm] = useMarriageForm(marriage, isOpen);

  const updateMutation = useMarriageMutation({
    form,
    mode: "update",
    marriage,
    onReset: () => onOpenChange(false),
  });

  const {
    isOpen: confirmDeleteIsOpen,
    onOpen: confirmDeleteOnOpen,
    onOpenChange: confirmDeleteOnOpenChange,
  } = useDisclosure();

  const deleteMutation = useMarriageMutation({
    mode: "delete",
    marriage,
    onReset: () => {
      confirmDeleteOnOpenChange(false);
      onOpenChange(false);
    },
  });

  return (
    <>
      <ConfirmDelete
        isOpen={confirmDeleteIsOpen}
        onOpenChange={confirmDeleteOnOpenChange}
        handleDelete={deleteMutation.mutate}
        isDeleting={deleteMutation.isPending}
        label="Pernikahan"
        toDelete={names ? `${names.husband} dan ${names.wife}` : ""}
      />

      <MarriageForm
        form={form}
        setForm={setForm}
        mode="edit"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onSubmit={updateMutation.mutate}
        onDelete={confirmDeleteOnOpen}
        marriage={marriage}
      />
    </>
  );
}
