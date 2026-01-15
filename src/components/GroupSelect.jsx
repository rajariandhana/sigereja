import { Select, SelectItem } from "@heroui/react";
import { change, renderColorChip } from "./Commons";

export default function GroupSelect({
  label,
  type,
  options,
  old,
  selecteds,
  setSelecteds,
  isClearable = false,
}) {
  // extract ids for Select

  return (
    <Select
      label={label}
      items={options}
      selectedKeys={selecteds}
      selectionMode="multiple"
      onSelectionChange={setSelecteds}
      renderValue={(items) => (
        <div className="flex gap-2 flex-wrap">
          {items.map((item) => renderColorChip(options, item.key))}
        </div>
      )}
      variant="faded"
      description={old ? change(old, selecteds) : <></>}
      isClearable={isClearable}
      isMultiline
    >
      {(option) => (
        <SelectItem key={option.slug} textValue={option.label}>
          {renderColorChip(options, option.slug)}
        </SelectItem>
      )}
    </Select>
  );
}
