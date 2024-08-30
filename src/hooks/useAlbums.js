import { useMutation, useQuery } from "@tanstack/react-query";
import apiClient from "../constants/api-client.js";

export const useFetchAllAlbums = () => {
  return useQuery({
    queryKey: ["All Albums"],
    queryFn: () => apiClient.get("/api/albums").then((res) => res.data.albums),
  });
};

export const useDeleteAllAlbums = () => {
  return useMutation({
    mutationKey: ["Delete All Albums"],
    mutationFn: () => apiClient.delete("/api/albums").then((res) => res.data),
  });
};

export const useCreateAlbum = ({ refetch }) => {
  return useMutation({
    mutationKey: ["Create New Album"],
    mutationFn: (data) =>
      apiClient.post("/api/albums/create-album", data).then((res) => {
        refetch();
        return res.data;
      }),
  });
};

export const useFetchAlbum = (albumId) => {
  return useQuery({
    queryKey: ["Album", albumId],
    queryFn: () =>
      apiClient
        .get(`/api/albums/${albumId}`, { from: "LONEWOLF" })
        .then((res) => res.data),
  });
};

export const useDeleteAlbum = ({ refetch }) => {
  return useMutation({
    mutationKey: ["Delete Album"],
    mutationFn: ({ albumId }) =>
      apiClient.delete(`/api/albums/${albumId}`).then((res) => {
        refetch();
        return res.data;
      }),
  });
};

export const useUpdateAlbum = ({ albumId, refetch }) => {
  return useMutation({
    mutationKey: ["Update Album", albumId],
    mutationFn: (data) =>
      apiClient.put(`/api/albums/${albumId}`, data).then((res) => {
        refetch();
        return res.data;
      }),
  });
};

export const useFetchMedia = (mediaId) => {
  return useQuery({
    queryKey: ["Media File", mediaId],
    queryFn: () =>
      apiClient.get(`/api/albums/media/${mediaId}`).then((res) => res.data),
  });
};

export const useDeleteMedia = ({ refetch, refetchAlbum }) => {
  return useMutation({
    mutationKey: ["Delete Media"],
    mutationFn: ({ mediaId }) =>
      apiClient.delete(`/api/albums/media/${mediaId}`).then(async (res) => {
        await refetchAlbum();
        await refetch();
        return res.data;
      }),
  });
};
