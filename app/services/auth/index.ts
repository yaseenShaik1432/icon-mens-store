import axios, { AxiosError } from "axios";

export async function logout() {
  try {
    const res = await axios.get(`/api/auth/logout`);
    return res;
  } catch (error) {
    return error;
  }
}
