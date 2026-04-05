import { serverFetch } from "../serverApi";

import type {
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateAvatarResponse,
} from "../../types/user.types";

// GET /users/current
export const getCurrentUser = async (): Promise<GetUserResponse> => {
  return serverFetch<GetUserResponse>("/users/current");
};

// PATCH /users/info
export const updateUser = async (
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  return serverFetch<UpdateUserResponse>("/users/info", {
    method: "PATCH",
    body: data,
  });
};

// PATCH /users/avatar
export const updateAvatar = async (
  file: File | Blob,
): Promise<UpdateAvatarResponse> => {
  const formData = new FormData();
  formData.append("avatar", file);

  return serverFetch<UpdateAvatarResponse>("/users/avatar", {
    method: "PATCH",
    body: formData,
  });
};

// DELETE /users/avatar
export const deleteAvatar = async (): Promise<void> => {
  return serverFetch<void>("/users/avatar", { method: "DELETE" });
};
