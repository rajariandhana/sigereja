import { Link, Spinner } from "@heroui/react";
import {
  useMinistries,
  useParticipantForm,
  useParticipantsMutation,
  usePrayerGroups,
} from "../../hooks/hooks";
import ParticipantForm from "./ParticipantForm";
import { useEffect } from "react";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

export default function ParticipantCreate() {
  const { data: ministries } = useMinistries();
  const { data: prayerGroups } = usePrayerGroups();

  const [form, setForm] = useParticipantForm();
  //   {
  //   ministrySlugs: new Set(["pemuda-remaja"])
  // }
  const createMutation = useParticipantsMutation({
    form,
    mode: "create",
  });

  useEffect(() => {
    console.log(form.ministrySlugs, form.prayerGroupSlugs);
  }, [form]);

  if (!ministries || !prayerGroups) return <Spinner />;

  return (
    <div className="flex flex-col w-full xl:w-3/4 gap-4">
      <Link href={`/`}>
        <MdKeyboardDoubleArrowLeft />
        Kembali
      </Link>
      <div className="flex w-full justify-between items-center">
        <h2 className="text-lg">Data Jemaat Baru</h2>
      </div>
      <ParticipantForm
        form={form}
        setForm={setForm}
        ministries={ministries}
        prayerGroups={prayerGroups}
        mode="create"
        onSubmit={createMutation.mutate}
        isSubmitting={createMutation.isPending}
      />
    </div>
  );
}
