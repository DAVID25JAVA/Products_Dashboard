import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (data) =>
        set({
          token: data.token,
          user: data,
        }),

      logout: () =>
        set({
          token: null,
          user: null,
        }),
    }),
    { name: "auth-storage" }
  )
);

export default useAuthStore;
