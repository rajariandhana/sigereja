import { Select, SelectItem } from "@heroui/react";
import { renderColorChip } from "./Commons";

export default function MultiSelect({
  label,
  type,
  options,
  selecteds,
  setSelecteds,
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
    >
      {(option) => (
        <SelectItem key={option._id} textValue={option.label}>
          {renderColorChip(options, option._id)}
        </SelectItem>
      )}
    </Select>
  );
}
