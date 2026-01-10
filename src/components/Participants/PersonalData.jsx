import { useContext } from "react";
import { ParticipantContext } from "../../utils/context";
import { change, renderGender } from "../Commons";
import { DatePicker, Input, Select, SelectItem, Textarea } from "@heroui/react";
import { calculateAge, formatDateTimeID, genders } from "../../utils/util";

export default function PersonalData() {
  const {
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
    updatePersonalData,
    isUpdating,
  } = useContext(ParticipantContext);

  return (
    <div className="flex flex-col w-full xl:w-3/4 mb-12 gap-4">
      <div className="flex w-full justify-between items-center">
        <h2 className="text-lg">Data Pribadi</h2>
        <span className="text-sm">
          Terakhir diubah: {formatDateTimeID(participant.updatedAt)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Input
          label="Nama"
          value={name}
          onValueChange={setName}
          variant="faded"
          description={change(participant.name, name)}
        />
        <div className="flex gap-4">
          <Input
            label="Tempat Lahir"
            value={birth_place}
            onValueChange={setBirth_place}
            variant="faded"
            description={change(participant.birth_place, birth_place)}
          />
          <DatePicker
            label="Tanggal Lahir"
            value={birth_date}
            onChange={setBirth_date}
            showMonthAndYearPickers
            selectorButtonPlacement="start"
            endContent={
              <span className="w-full text-black items-end text-xs xl:text-md">
                {calculateAge(birth_date)} tahun
              </span>
            }
            variant="faded"
            description={change(participant.birth_date, birth_date)}
          />
        </div>
        <Textarea
          label="Alamat"
          value={address}
          onValueChange={setAddress}
          variant="faded"
          description={change(participant.address, address)}
        />
        <div className="flex gap-4">
          <Input
            label="Nomor Telepon"
            value={phone}
            onValueChange={setPhone}
            variant="faded"
            description={change(participant.phone, phone)}
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
            description={change(participant.gender, gender)}
          >
            {(g) => <SelectItem key={g.key}>{renderGender(g.key)}</SelectItem>}
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Textarea
          label="Catatan Tambahan"
          value={notes}
          onValueChange={setNotes}
          variant="faded"
          description={change(participant.notes, notes)}
        />
        <Select
          label="Status Baptis"
          selectionMode="single"
          selectedKeys={[baptized]}
          onChange={(e) => setBaptized(e.target.value)}
          variant="faded"
          description={change(participant.baptized, baptized)}
          className="w-1/2"
        >
          <SelectItem key={"yes"}>Sudah</SelectItem>
          <SelectItem key={"no"}>Belum</SelectItem>
        </Select>
      </div>
    </div>
  );
}
