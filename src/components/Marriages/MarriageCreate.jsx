import { useMarriageForm, useMarriageMutation } from "../../hooks/hooks";
import MarriageForm from "./MarriageForm";

export function MarriageCreate({ isOpen, onOpen, onOpenChange}) {
  const [form, setForm] = useMarriageForm();
  const createMutation = useMarriageMutation({
    form,
    mode: "create",
    onReset: () => onOpenChange(false),
  });
  return (
    <MarriageForm
      form={form}
      setForm={setForm}
      mode="create"
      isOpen={isOpen}
      onOpen={onOpen}
      onOpenChange={onOpenChange}
      onSubmit={createMutation.mutate}
    />
  );
}
