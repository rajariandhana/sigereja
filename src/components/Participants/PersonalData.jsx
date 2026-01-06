import { useContext } from "react";
import { ParticipantContext } from "../../utils/context";
import { renderGender } from "../Commons";
import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { calculateAge, genders } from "../../utils/util";

export default function PersonalData() {
  const {
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
  } = useContext(ParticipantContext);

  return (
    <div className="flex flex-col w-3/4 mb-12 gap-4">
      <h2 className="text-lg">Data Pribadi</h2>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Nama" value={name} onValueChange={setName} />
        <div className="flex gap-4">
          <Input
            label="Tempat Lahir"
            value={birth_place}
            onValueChange={setBirth_place}
          />
          <DatePicker
            label="Tanggal Lahir"
            value={birth_date}
            onChange={setBirth_date}
            description={`Usia: ${calculateAge(birth_date)} tahun`}
            showMonthAndYearPickers
          />
        </div>
        <Textarea label="Alamat" value={address} onValueChange={setAddress} />
        <div className="flex gap-4">
          <Input label="Nomor Telepon" value={phone} onValueChange={setPhone} />
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
          >
            {(g) => <SelectItem key={g.key}>{renderGender(g.key)}</SelectItem>}
          </Select>
        </div>
      </div>
      <div className="flex w-full justify-end mt-4">
        <Button color="primary" variant="ghost">Simpan Perubahan Data Pribadi</Button>
      </div>
    </div>
  );
}
