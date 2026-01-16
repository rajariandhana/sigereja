import { useParams } from "react-router";
import { useEffect } from "react";
import { Chip, Link, Spinner, useDisclosure } from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { formatDateTimeID } from "../../utils/util";
import {
  useMinistries,
  useParticipant,
  useParticipantForm,
  useParticipantsMutation,
  usePrayerGroups,
} from "../../hooks/hooks";
import ParticipantForm from "./ParticipantForm";
import ConfirmDelete from "../ConfirmDelete";

export default function ParticipantDetail() {
  const { participantId } = useParams();
  const { data: participant } = useParticipant(participantId);

  const { data: ministries } = useMinistries();
  const { data: prayerGroups } = usePrayerGroups();

  const [form, setForm] = useParticipantForm();

  const updateMutation = useParticipantsMutation({
    form: form,
    mode: "update",
    participant: participant,
  });
  const deleteMutation = useParticipantsMutation({
    mode: "delete",
    participant: participant,
  });

  const {
    isOpen: confirmDeleteIsOpen,
    onOpen: confirmDeleteOnOpen,
    onOpenChange: confirmDeleteOnOpenChange,
  } = useDisclosure();

  useEffect(() => {
    if (!participant || !ministries || !prayerGroups) return;
    // console.log(participant.ministries);
    const ministryIds = new Set(
      participant.ministries.map((m) => m.ministryId)
    );
    const ministrySlugs = ministries
      .filter((m) => ministryIds.has(m._id))
      .map((m) => m.slug);
    // console.log(ministrySlugs);
    const prayerGroupIds = new Set(
      participant.prayerGroups.map((m) => m.prayerGroupId)
    );
    const prayerGroupSlugs = prayerGroups
      .filter((p) => prayerGroupIds.has(p._id))
      .map((p) => p.slug);
    // console.log(prayerGroupSlugs);
    // setBack();
    setForm({
      name: participant.name ?? "",
      address: participant.address ?? "",
      birth_place: participant.birth_place ?? "",
      birth_date: participant.birth_date
        ? parseDate(participant.birth_date)
        : undefined,
      phone: participant.phone ?? "",
      gender: participant.gender ?? undefined,
      notes: participant.notes ?? "",
      baptized: participant.baptized ? "yes" : "no",
      ministrySlugs: ministrySlugs ?? new Set([]),
      prayerGroupSlugs: prayerGroupSlugs ?? new Set([]),
    });
  }, [participant, ministries, prayerGroups]);

  if (!participant || !ministries || !prayerGroups) return <Spinner />;
  return (
    <div className="flex flex-col w-full xl:w-3/4 gap-4">
      <Link href={`/`}>
        <MdKeyboardDoubleArrowLeft />
        Kembali
      </Link>
      <div className="flex w-full justify-between items-center">
        <h2 className="text-lg">Data Pribadi</h2>
        <Chip variant="flat" color="warning">
          Terakhir diubah: {formatDateTimeID(participant.updatedAt)}
        </Chip>
      </div>
      <ConfirmDelete
        isOpen={confirmDeleteIsOpen}
        onOpen={confirmDeleteOnOpen}
        onOpenChange={confirmDeleteOnOpenChange}
        handleDelete={deleteMutation.mutate}
        isDeleting={deleteMutation.isPending}
        label={"Jemaat"}
        toDelete={participant.name}
      />
      <ParticipantForm
        form={form}
        setForm={setForm}
        ministries={ministries}
        prayerGroups={prayerGroups}
        mode="edit"
        onSubmit={updateMutation.mutate}
        isSubmitting={updateMutation.isPending}
        onDelete={confirmDeleteOnOpen}
        isDeleting={deleteMutation.isPending}
        participant={participant}
      />
    </div>
  );
}
