import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "../libs/axios/instance";
import { addToast } from "@heroui/react";
import { formatToYMD } from "../utils/util";
import { useNavigate } from "react-router";
import { useState } from "react";
import { parseDate } from "@internationalized/date";

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

export function useParticipantForm(initialData = {}) {
  return useState({
    name: initialData.name ?? "",
    address: initialData.address ?? "",
    birth_place: initialData.birth_place ?? "",
    birth_date: initialData.birth_date
      ? parseDate(initialData.birth_date)
      : undefined,
    phone: initialData.phone ?? "",
    gender: initialData.gender ?? undefined,
    notes: initialData.notes ?? "",
    baptized: initialData.baptized ? "yes" : "no",
    ministrySlugs: initialData.ministrySlugs ?? new Set([]),
    prayerGroupSlugs: initialData.prayerGroupSlugs ?? new Set([]),
  });
}

function buildParticipantPayload(form) {
  const payload = {
    name: form.name,
    address: form.address,
    birth_place: form.birth_place,
    birth_date: formatToYMD(form.birth_date),
    phone: form.phone,
    gender: form.gender,
    notes: form.notes,
    baptized: form.baptized === "yes",
    ministrySlugs: [...form.ministrySlugs],
    prayerGroupSlugs: [...form.prayerGroupSlugs],
  };
  console.log("PAYLOAD", payload);
  return payload;
}

export function useParticipantsMutation({
  form,
  participant,
  mode, // "create" | "update" | "delete"
  onReset,
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const payload = buildParticipantPayload(form);
      if (mode === "create") {
        const response = await instance.post(`/participants`, payload);
        return response.data.data;
      } else if (mode === "update") {
        const response = await instance.patch(
          `/participants/${participant._id}`,
          payload
        );
        return response.data.data;
      } else if (mode === "delete") {
        const response = await instance.delete(
          `/participants/${participant._id}`
        );
        return response.data.data;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["participants"] });
      if (mode === "update") {
        queryClient.invalidateQueries({
          queryKey: ["participants", participant._id],
        });
      } else if (mode === "create" || mode === "delete") {
        navigate("/");
      }
      addToast({
        title: "Berhasil",
        description:
          mode === "delete"
            ? `Jemaat ${form.name} berhasil dihapus!`
            : `Data ${form.name} berhasil disimpan!`,
        color: "success",
      });
    },
    onError: () => {
      onReset?.();
      addToast({
        title: "Error!",
        description: "Terjadi kesalahan saat menyimpan data jemaat!",
        color: "danger",
      });
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
