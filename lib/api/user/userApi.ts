import { api } from "../api";

import type {
  GetUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
  UpdateAvatarResponse,
} from "./user.types";

// * --------------- API --------------- */

// GET /users/current
export const getCurrentUser = async (): Promise<GetUserResponse> => {
  const res = await api.get("/users/current");
  return res.data;
};

// PATCH /users/info
export const updateUser = async (
  data: UpdateUserRequest,
): Promise<UpdateUserResponse> => {
  const res = await api.patch("/users/info", data);
  return res.data;
};

// PATCH /users/avatar
export const updateAvatar = async (
  file: File,
): Promise<UpdateAvatarResponse> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const res = await api.patch("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

// DELETE /users/avatar
export const deleteAvatar = async (): Promise<void> => {
  await api.delete("/users/avatar");
};
