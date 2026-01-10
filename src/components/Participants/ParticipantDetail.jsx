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
import { parseDate, parseDateTime, parseZonedDateTime } from "@internationalized/date";
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
  usePrayerGroups,
} from "../../hooks/hooks";

export default function ParticipantDetail() {
  const { participantId } = useParams();
  const { data: participant } = useParticipant(participantId);

  const { data: ministries } = useMinistries();
  const { data: prayerGroups } = usePrayerGroups();

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birth_place, setBirth_place] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState();
  const [notes, setNotes] = useState("");
  const [baptized, setBaptized] = useState("no");
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [selectedPrayerGroups, setSelectedPrayerGroups] = useState([]);

  const queryClient = useQueryClient();
  const updateMutation = useMutation({
    mutationFn: async () => {
      const newData = {
        name: name,
        address: address,
        birth_place: birth_place,
        birth_date: formatToYMD(birth_date),
        phone: phone,
        gender: gender,
        notes: notes,
        baptized: baptized === "yes" ? true : false,
        ministries: selectedMinistries,
        prayerGroups: selectedPrayerGroups,
      };
      const response = await instance.patch(
        `/participants/${participant._id}`,
        newData
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["participants", participantId],
      });
      addToast({
        title: "Perubahan berhasil disimpan!",
        // description: ""
        color: "success",
      });
    },
    onError: () => {
      setBack();
      addToast({
        title: "Error!",
        description: "Terjadi kesalahan saat menyimpan data jemaat",
        color: "danger",
      });
    },
  });

  const navigate = useNavigate();

  const {
    isOpen: confirmIsOpen,
    onOpen: confirmOnOpen,
    onOpenChange: confirmOnOpenChange,
  } = useDisclosure();
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await instance.delete(
        `/participants/${participant._id}`
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      navigate("/");
      addToast({
        title: "Jemaat berhasil dihapus!",
        // description: ""
        color: "success",
      });
    },
    onError: () => {
      setBack();
      addToast({
        title: "Error!",
        description: "Terjadi kesalahan ketika menghapus data jemaat!",
        color: "danger",
      });
    },
  });

  const setBack = () => {
    setName(participant.name);
    setAddress(participant.address);
    setBirth_place(participant.birth_place);
    setBirth_date(parseDate(participant.birth_date));
    setPhone(participant.phone);
    setGender(participant.gender);
    setNotes(participant.notes);
    participant.baptized = participant.baptized === true ? "yes" : "no";
    setBaptized(participant.baptized);
    setSelectedMinistries(participant.ministries);
    setSelectedPrayerGroups(participant.prayerGroups);
  };
  useEffect(() => {
    if (!participant) return;
    // console.log(participant);
    setBack();
  }, [participant]);

  // useEffect(() => {
  //   console.log("birth_date", birth_date);
  // }, [birth_date]);

  // useEffect(() => {
  //   console.log("GENDER", JSON.stringify(gender));
  // }, [gender]);
  // useEffect(() => {
  //   console.log("baptized", JSON.stringify(baptized));
  // }, [baptized]);

  if (!participant || !ministries || !prayerGroups) return <Spinner />;
  return (
    <ParticipantContext.Provider
      className="flex flex-col gap-12"
      value={{
        participant,
        name,
        setName,
        address,
        setAddress,
        birth_place,
        setBirth_place,
        birth_date,
        setBirth_date,
        phone,
        setPhone,
        gender,
        setGender,
        notes,
        setNotes,
        baptized,
        setBaptized,
        updatePersonalData: updateMutation.mutate,
        isUpdating: updateMutation.isPending,
      }}
    >
      <Link href={`/`} className="mb-8">
        <MdKeyboardDoubleArrowLeft />
        Kembali
      </Link>
      {/* {JSON.stringify(participant)} */}
      <PersonalData />
      {/* <div className="flex flex-col gap-4">
        <h2 className="text-lg">Wadah</h2>
        <div className="flex gap-2">
          {selectedMinistries.map((ministry) =>
            renderColorChip(ministries, ministry.ministryId)
          )}
        </div>
      </div> */}
      <div className="flex gap-4 w-full xl:w-3/4">
        <GroupSelect
          label="Wadah"
          type="ministries"
          options={ministries}
          old={participant.ministries}
          selecteds={selectedMinistries}
          setSelecteds={setSelectedMinistries}
        />
        <GroupSelect
          label="Kelompok Doa"
          type="prayerGroups"
          options={prayerGroups}
          old={participant.prayerGroups}
          selecteds={selectedPrayerGroups}
          setSelecteds={setSelectedPrayerGroups}
        />
      </div>
      <div className="flex w-full xl:w-3/4 justify-between mt-8">
        <Button
          color="warning"
          variant="ghost"
          onPress={updateMutation.mutate}
          isLoading={updateMutation.isUpdating}
          isDisabled={updateMutation.isUpdating}
        >
          {updateMutation.isUpdating ? (
            <>
              <Spinner />
              "Menyimpan..."
            </>
          ) : (
            <>
              <IoHammerOutline size={20} />
              Simpan Semua Perubahan
            </>
          )}
        </Button>
        <Button
          color="danger"
          variant="ghost"
          onPress={confirmOnOpen}
          isLoading={deleteMutation.isUpdating}
          isDisabled={deleteMutation.isUpdating}
        >
          {deleteMutation.isUpdating ? (
            <>
              <Spinner color="danger" />
              "Menghapus..."
            </>
          ) : (
            <>
              <HiOutlineTrash size={20} />
              Hapus Jemaat
            </>
          )}
        </Button>
      </div>
      {/* <div>
        {JSON.stringify(selectedMinistries)}
        {JSON.stringify(selectedPrayerGroups)}
      </div> */}
      <Modal isOpen={confirmIsOpen} onOpenChange={confirmOnOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Konfirmasi Penghapusan</ModalHeader>
              <ModalBody>
                <p>Anda akan menghapus data jemaat:</p>
                <Code>{participant.name}</Code>
                <p>
                  Data yang dihapus tidak akan bisa dikembalikan. Apakah anda
                  yakin?
                </p>
              </ModalBody>
              <ModalFooter className="justify-between">
                <Button variant="shadow" onPress={onClose}>
                  Kembali
                </Button>
                <Button
                  color="danger"
                  variant="ghost"
                  onPress={deleteMutation.mutate}
                  isLoading={deleteMutation.isUpdating}
                  isDisabled={deleteMutation.isUpdating}
                >
                  {deleteMutation.isUpdating ? (
                    <>
                      <Spinner color="danger" />
                      "Menghapus..."
                    </>
                  ) : (
                    <>
                      <HiOutlineTrash size={20} />
                      Hapus Jemaat
                    </>
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </ParticipantContext.Provider>
  );
}
