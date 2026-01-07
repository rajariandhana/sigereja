import { useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../libs/axios/instance";

const fetchParticipants = async () => {
  try {
    const response = await instance.get(`/participants`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching participants:", error);
  } finally {
    console.log("Participants fetch attempt finished.");
  }
};

// const {data: participants, isPending, refetch} = useParticipants();
export function useParticipants() {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["participants"],
    queryFn: fetchParticipants,
    select: (participants) => {
      participants.forEach((p) =>
        queryClient.setQueryData(["participants", p.id], p)
      );
      return participants;
    },
  });
}

const fetchParticipant = async (participantId) => {
  try {
    const response = await instance.get(`/participants/${participantId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching participant:", error);
  } finally {
    console.log("Participant fetch attempt finished.");
  }
};
// const { data: participant } = useParticipant(participantId);
export function useParticipant(participantId) {
  return useQuery({
    queryKey: ["participants", participantId],
    queryFn: () => fetchParticipant(participantId),
  });
}

const fetchMinistries = async () => {
  try {
    const response = await instance.get(`/ministries`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching Ministries:", error);
  } finally {
    console.log("Ministries fetch attempt finished.");
  }
};

// const { data: ministries, isPending: isPendingMinistries } = useMinistries();
export function useMinistries() {
  return useQuery({
    queryKey: ["ministries"],
    queryFn: fetchMinistries,
  });
}

const fetchPrayerGroups = async () => {
  try {
    const response = await instance.get(`/prayer-groups`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching PrayerGroups:", error);
  } finally {
    console.log("PrayerGroups fetch attempt finished.");
  }
};
// const { data: prayerGroups, isPending: isPendingPrayerGroups } = usePrayerGroups();
export function usePrayerGroups() {
  return useQuery({
    queryKey: ["prayer-groups"],
    queryFn: fetchPrayerGroups,
  });
}
