import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Spinner,
  Textarea,
} from "@heroui/react";
import { useState } from "react";
import { calculateAge, genders } from "../../utils/util";
import { renderGender } from "../Commons";
import {
  useMinistries,
  useParticipantsMutation,
  usePrayerGroups,
} from "../../hooks/hooks";
import GroupSelect from "../GroupSelect";
import { IoHammerOutline } from "react-icons/io5";

export default function ParticipantCreate() {
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

  const { createMutation } = useParticipantsMutation(
    name,
    address,
    birth_place,
    birth_date,
    phone,
    gender,
    notes,
    baptized,
    selectedMinistries,
    selectedPrayerGroups,
    null,
    null
  );

  if (!ministries || !prayerGroups) return <Spinner />;

  return (
    <>
      <div className="flex flex-col w-full xl:w-3/4 mb-12 gap-4">
        <div className="flex w-full justify-between items-center">
          <h2 className="text-lg">Data Jemaat Baru</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Input
            label="Nama"
            value={name}
            onValueChange={setName}
            variant="faded"
            isRequired
          />
          <div className="flex gap-4">
            <Input
              label="Tempat Lahir"
              value={birth_place}
              onValueChange={setBirth_place}
              variant="faded"
            />
            <DatePicker
              label="Tanggal Lahir"
              value={birth_date}
              onChange={setBirth_date}
              showMonthAndYearPickers
              selectorButtonPlacement="start"
              endContent={
                birth_date ? (
                  <span className="w-full text-black items-end text-xs xl:text-md">
                    {calculateAge(birth_date)} tahun
                  </span>
                ) : (
                  <></>
                )
              }
              variant="faded"
              isRequired
            />
          </div>
          <Textarea
            label="Alamat"
            value={address}
            onValueChange={setAddress}
            variant="faded"
          />
          <div className="flex gap-4">
            <Input
              label="Nomor Telepon"
              value={phone}
              onValueChange={setPhone}
              variant="faded"
              placeholder="08XXX..."
            />
            <Select
              label="Jenis Kelamin"
              selectionMode="single"
              selectedKeys={[gender]}
              onChange={(e) => setGender(e.target.value)}
              items={genders}
              renderValue={(items) => {
                return items.map((item) => (
                  <span key={item.key}>{renderGender(item.data.key)}</span>
                ));
              }}
              variant="faded"
              isRequired
            >
              {(g) => (
                <SelectItem key={g.key}>{renderGender(g.key)}</SelectItem>
              )}
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Textarea
            label="Catatan Tambahan"
            value={notes}
            onValueChange={setNotes}
            variant="faded"
          />
          <Select
            label="Status Baptis"
            selectionMode="single"
            selectedKeys={[baptized]}
            onChange={(e) => setBaptized(e.target.value)}
            variant="faded"
            className="w-1/2"
          >
            <SelectItem key={"yes"}>Sudah</SelectItem>
            <SelectItem key={"no"}>Belum</SelectItem>
          </Select>
        </div>
      </div>
      <div className="flex gap-4 w-full xl:w-3/4">
        <GroupSelect
          label="Wadah"
          type="ministries"
          options={ministries}
          selecteds={selectedMinistries}
          setSelecteds={setSelectedMinistries}
        />
        <GroupSelect
          label="Kelompok Doa"
          type="prayerGroups"
          options={prayerGroups}
          selecteds={selectedPrayerGroups}
          setSelecteds={setSelectedPrayerGroups}
        />
      </div>
      <div className="flex w-full xl:w-3/4 justify-end mt-8">
        <Button color="primary" variant="ghost" onPress={createMutation.mutate}>
          <IoHammerOutline size={20} />
          Simpan Data Jemaat
        </Button>
      </div>
    </>
  );
}
