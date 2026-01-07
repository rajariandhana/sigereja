import { Select, SelectItem } from "@heroui/react";
import { change, renderColorChip } from "./Commons";

export default function GroupSelect({
  label,
  type,
  options,
  old,
  selecteds,
  setSelecteds,
  isClearable=false,
}) {
  // extract ids for Select
  const selectedKeys = selecteds.map((s) =>
    type === "ministries" ? s.ministryId : s.prayerGroupId
  );

  return (
    <Select
      label={label}
      selectionMode="multiple"
      selectedKeys={selectedKeys}
      items={options}
      isMultiline
      onSelectionChange={(keys) => {
        // keys is a Set
        const values = Array.from(keys).map((id) =>
          type === "ministries"
            ? {
                ministryId: id,
              }
            : {
                prayerGroupId: id,
              }
        );
        setSelecteds(values);
      }}
      renderValue={(items) => (
        <div className="flex gap-2 flex-wrap">
          {items.map((item) => renderColorChip(options, item.key))}
        </div>
      )}
      variant="faded"
      description={old?change(old, selecteds):<></>}
      isClearable={isClearable}
    >
      {(option) => (
        <SelectItem key={option._id} textValue={option.label}>
          {renderColorChip(options, option._id)}
        </SelectItem>
      )}
    </Select>
  );
}
