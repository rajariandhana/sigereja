export function renderGender(gender) {
  const color = gender === "pria" ? "blue" : "pink";
  return (
    <span
      className={`bg-${color}-100 text-${color}-500 text-xs xl:text-sm rounded-full px-2 py-1 w-fit`}
    >
      {gender}
    </span>
  );
}

export const renderColorChip = (mapping, id) => {
  const { name, color } = mapping.find((m) => m._id === id);
  return (
    <span
      className={`bg-${color}-100 text-${color}-500 text-xs xl:text-sm rounded-full px-2 py-1`}
    >
      {name}
    </span>
  );
};
export const renderColorChips = (ls, mapping, type) => {
  return (
    <span className="flex flex-wrap gap-2">
      {ls.map((l) =>
        renderColorChip(
          mapping,
          type === "ministries" ? l.ministryId._id : l.prayerGroupId._id
        )
      )}
    </span>
  );
};

export const change = (a, b) => {
  if (a!=b) {
    // console.log(a,b);
    return <span className="text-warning">Terdeteksi perubahan!</span>
  }
}
