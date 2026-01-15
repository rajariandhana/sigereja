import {
  Button,
  DatePicker,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { calculateAge, genders } from "../../utils/util";
import { renderGender } from "../Commons";
import GroupSelect from "../GroupSelect";
import { IoHammerOutline } from "react-icons/io5";

export default function ParticipantForm({
  form,
  setForm,
  ministries,
  prayerGroups,
  mode,
  onSubmit,
  isSubmitting,
  onDelete,
  isDeleting
}) {
  const update = (key) => (value) => setForm((f) => ({ ...f, [key]: value }));

  return (
    <>
      <div className="flex flex-col w-full xl:w-3/4 mb-12 gap-4">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Input
            label="Nama"
            value={form.name}
            onValueChange={update("name")}
            variant="faded"
            isRequired
          />
          <div className="flex gap-4">
            <Input
              label="Tempat Lahir"
              value={form.birth_place}
              onValueChange={update("Birth_place")}
              variant="faded"
            />
            <DatePicker
              label="Tanggal Lahir"
              value={form.birth_date}
              onChange={update("birth_date")}
              showMonthAndYearPickers
              selectorButtonPlacement="start"
              endContent={
                form.birth_date && (
                  <span className="w-full text-black items-end text-xs xl:text-md">
                    {calculateAge(form.birth_date)} tahun
                  </span>
                )
              }
              variant="faded"
              isRequired
            />
          </div>
          <Textarea
            label="Alamat"
            value={form.address}
            onValueChange={update("Address")}
            variant="faded"
          />
          <div className="flex gap-4">
            <Input
              label="Nomor Telepon"
              value={form.phone}
              onValueChange={update("Phone")}
              variant="faded"
              placeholder="08XXX..."
            />
            <Select
              label="Jenis Kelamin"
              selectionMode="single"
              selectedKeys={[form.gender]}
              onChange={(e) => update("gender")(e.target.value)}
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
            value={form.notes}
            onValueChange={update("Notes")}
            variant="faded"
          />
          <Select
            label="Status Baptis"
            selectionMode="single"
            selectedKeys={[form.baptized]}
            onChange={(e) => update("baptized")(e.target.value)}
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
          selecteds={form.ministrySlugs}
          setSelecteds={(v) => update("ministrySlugs")(v)}
        />
        <GroupSelect
          label="Kelompok Doa"
          type="prayerGroups"
          options={prayerGroups}
          selecteds={form.prayerGroupSlugs}
          setSelecteds={(v) => update("prayerGroupSlugs")(v)}
        />
      </div>
      <div className="flex w-full xl:w-3/4 justify-between mt-8">
        <Button
          color="primary"
          variant="ghost"
          onPress={onSubmit}
          isLoading={isSubmitting}
        >
          <IoHammerOutline size={20} />
          Simpan Data Jemaat
        </Button>
        {mode === "edit" && (
          <Button
            color="danger"
            variant="ghost"
            onPress={onDelete}
            isLoading={isDeleting}
          >
            <IoHammerOutline size={20} />
            Hapus Data Jemaat
          </Button>
        )}
      </div>
    </>
  );
}
