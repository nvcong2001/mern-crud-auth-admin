import axiosInstance from "../utils/axiosInstance";

export const authService = {
  signUp: async (
    username: string,
    password: string,
    email: string,
    firstName: string,
    lastName: string,
  ) => {
    const res = await axiosInstance.post(
      "/auth/signup",
      {
        username,
        password,
        email,
        firstName,
        lastName,
      },
      { withCredentials: true },
    );

    return res.data;
  },

  signIn: async (username: string, password: string) => {
    const res = await axiosInstance.post(
      "auth/signin",
      { username, password },
      { withCredentials: true },
    );
    return res.data; // access token
  },

  signOut: async () => {
    return axiosInstance.post("/auth/signout", { withCredentials: true });
  },

  fetchMe: async () => {
    const res = await axiosInstance.get("/users/me", { withCredentials: true });
    return res.data.user;
  },

  refresh: async () => {
    const res = await axiosInstance.post("/auth/refresh", {
      withCredentials: true,
    });
    return res.data.accessToken;
  },
};
