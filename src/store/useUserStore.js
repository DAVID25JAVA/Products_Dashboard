import { create } from "zustand";

const useUserStore = create((set, get) => ({
  users: [],
  total: 0,
  loading: false,

  fetchUsers: async (limit, skip, search = "") => {
    const cacheKey = `${limit}-${skip}-${search}`;
    if (get()[cacheKey]) return;

    set({ loading: true });
    const url = search
      ? `https://dummyjson.com/users/search?q=${search}`
      : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;

    const res = await fetch(url);
    const data = await res.json();

    set({
      users: data.users,
      total: data.total,
      loading: false,
      [cacheKey]: data.users,
    });
  },
}));

export default useUserStore;
