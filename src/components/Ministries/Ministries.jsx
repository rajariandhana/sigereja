import {
  useMinistryMutation,
  useMinistries,
} from "../../hooks/hooks";
import Groups from "../Groups";

export default function PrayerGroups() {
  return (
    <Groups
      useGroups={useMinistries}
      useGroupMutation={useMinistryMutation}
      label={"Wadah"}
      slug={"ministries"}
    ></Groups>
  );
}
