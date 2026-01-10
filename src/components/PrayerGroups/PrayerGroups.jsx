import {
  usePrayerGroupMutation,
  usePrayerGroups,
} from "../../hooks/hooks";
import Groups from "../Groups";

export default function PrayerGroups() {
  return (
    <Groups
      useGroups={usePrayerGroups}
      useGroupMutation={usePrayerGroupMutation}
      label={"Kelompok Doa"}
      slug={"prayer-groups"}
    ></Groups>
  );
}
