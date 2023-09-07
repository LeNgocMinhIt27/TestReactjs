import { getToken } from "./helper";
import { axiosInstance } from "@/api/sdk";

export const apiLogin = (data) =>
  axiosInstance
    .post(`api/web-authenticate`, {
      password: data.password,
      username: data.username,
    })
    .then((res) => res.data);
export const apiGetMe = () =>
  axiosInstance
    .get("api/me", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
    .then((res) => res.data.user);

export const apiLogout = () =>
  axiosInstance
    .post(
      "api/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
    .then((res) => res.data);
