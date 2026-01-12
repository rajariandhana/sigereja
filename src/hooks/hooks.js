import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../libs/axios/instance";
import { addToast } from "@heroui/react";

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

const fetchGroups = async (group_slug, label) => {
  try {
    const response = await instance.get(`/${group_slug}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching ${label}:`, error);
  } finally {
    console.log(`${label} fetch attempt finished.`);
  }
};

export function useGroups(group_slug, label) {
  return useQuery({
    queryKey: [group_slug],
    queryFn: () => fetchGroups(group_slug, label),
  });
}

export function useGroupMutation(
  group_slug,
  group_label,
  group,
  modal_create,
  modal_detail,
  refetch,
  data
) {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async () => {
      const response = await instance.post(`/${group_slug}`, data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [group_slug] });
      addToast({
        title: `${group_label} berhasil ditambah!`,
        color: "success",
      });
      modal_create();
      console.log("nullify group");
    },
    onError: (err) => {
      console.log(err);
      // setBack();
      addToast({
        title: "Error!",
        description: `Terjadi kesalahan ketika menambah ${group_label}!`,
        color: "danger",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      const response = await instance.patch(
        `/${group_slug}/${group._id}`,
        data
      );
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [group_slug, group._id],
      });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      addToast({
        title: `Perubahan pada ${group_label} berhasil disimpan!`,
        // description: ""
        color: "success",
      });
      refetch();
      modal_detail();
    },
    onError: () => {
      // setBack();
      addToast({
        title: "Error!",
        description: `Terjadi kesalahan saat menyimpan data ${group_label}`,
        color: "danger",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      const response = await instance.delete(`/${group_slug}/${group._id}`);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [group_slug] });
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      addToast({
        title: `${group_label} berhasil dihapus!`,
        color: "success",
      });
      modal_detail();
    },
    onError: () => {
      // setBack();
      addToast({
        title: "Error!",
        description: `Terjadi kesalahan ketika menghapus data ${group_label}!`,
        color: "danger",
      });
    },
  });

  return { createMutation, updateMutation, deleteMutation };
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
