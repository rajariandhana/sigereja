import { useNavigate, useParams } from "react-router";
import instance from "../../libs/axios/instance";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  addToast,
  Button,
  Code,
  DateInput,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@heroui/react";
import {
  parseDate,
  parseDateTime,
  parseZonedDateTime,
} from "@internationalized/date";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { ParticipantContext } from "../../utils/context";
import PersonalData from "./PersonalData";
import GroupSelect from "../GroupSelect";
import { formatDateTimeID, formatToYMD } from "../../utils/util";
import { IoHammerOutline } from "react-icons/io5";
import { HiOutlineTrash } from "react-icons/hi";
import {
  useMinistries,
  useParticipant,
  useParticipantForm,
  useParticipantsMutation,
  usePrayerGroups,
} from "../../hooks/hooks";
import ParticipantForm from "./ParticipantForm";

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
  })

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onOpenChange: confirmOnOpenChange,
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
    <>
      <h2 className="text-lg">Data Jemaat</h2>
      <ParticipantForm
        form={form}
        setForm={setForm}
        ministries={ministries}
        prayerGroups={prayerGroups}
        mode="edit"
        onSubmit={updateMutation.mutate}
        isSubmitting={updateMutation.isPending}
        onDelete={deleteMutation.mutate}
        isDeleting={deleteMutation.isPending}
      />
    </>
  );
}
