import { useParams } from "react-router";
import instance from "../../libs/axios/instance";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  DatePicker,
  Input,
  Link,
  Spinner,
  Textarea,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";
import { ParticipantContext } from "../../utils/context";
import PersonalData from "./PersonalData";
import MultiSelect from "../MultiSelect";

export default function ParticipantDetail() {
  console.log("HERE ParticipantDetail");
  const { participantId } = useParams();
  const fetchParticipant = async (participantId) => {
    try {
      const response = await instance.get(`/participants/${participantId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching participant:", error);
    } finally {
      console.log("Participant fetch attempt finished.");
    }
  };
  const {
    data: participant,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["participants", participantId],
    queryFn: () => fetchParticipant(participantId),
  });
  const fetchMinistries = async () => {
    try {
      const response = await instance.get(`/ministries`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching Ministries:", error);
    } finally {
      console.log("Ministries fetch attempt finished.");
    }
  };
  const { data: ministries, isPending: isPendingMinistries } = useQuery({
    queryKey: ["ministries"],
    queryFn: fetchMinistries,
  });
  const fetchPrayerGroups = async () => {
    try {
      const response = await instance.get(`/prayer-groups`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching PrayerGroups:", error);
    } finally {
      console.log("PrayerGroups fetch attempt finished.");
    }
  };
  const { data: prayerGroups, isPending: isPendingPrayerGroups } = useQuery({
    queryKey: ["prayer-groups"],
    queryFn: fetchPrayerGroups,
  });

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [birth_place, setBirth_place] = useState("");
  const [birth_date, setBirth_date] = useState();
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState();
  const [selectedMinistries, setSelectedMinistries] = useState([]);
  const [selectedPrayerGroups, setSelectedPrayerGroups] = useState([]);
  // const [participant, setParticipant] = useState();
  // useEffect(() => {
  //   if (!participants) return;
  //   const ps = participants.filter((p) => p._id === participantId);
  //   setParticipant(ps[0]);
  // }, [participants]);

  useEffect(() => {
    if (!participant) return;
    console.log(participant);
    setName(participant.name);
    setAddress(participant.address);
    setBirth_place(participant.birth_place);
    setBirth_date(parseDate(participant.birth_date));
    setPhone(participant.phone);
    setGender(participant.gender);
    setSelectedMinistries(participant.ministries);
    setSelectedPrayerGroups(participant.prayerGroups);
  }, [participant]);

  useEffect(() => {
    console.log(birth_date);
  }, [birth_date]);

  useEffect(() => {
    console.log("GENDER", JSON.stringify(gender));
  }, [gender]);

  if (!participant || !ministries || !prayerGroups) return <Spinner />;
  return (
    <ParticipantContext.Provider
      className="flex flex-col gap-12"
      value={{
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
      <div className="flex flex-col gap-4 w-1/2">
        <div className="flex items-center gap-4">
          <MultiSelect
            label="Wadah"
            type="ministries"
            options={ministries}
            selecteds={selectedMinistries}
            setSelecteds={setSelectedMinistries}
          />
          <Button variant="ghost" color="primary" className="w-1/3">
            Perbarui Wadah
          </Button>
        </div>
        <div className="flex items-center gap-4">
          <MultiSelect
            label="Kelompok Doa"
            type="prayerGroups"
            options={prayerGroups}
            selecteds={selectedPrayerGroups}
            setSelecteds={setSelectedPrayerGroups}
          />
          <Button variant="ghost" color="primary" className="w-1/3">
            Perbarui Wadah
          </Button>
        </div>
      </div>
    </ParticipantContext.Provider>
  );
}
