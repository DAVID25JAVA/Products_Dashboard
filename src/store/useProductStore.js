import { create } from "zustand";

const useProductStore = create((set) => ({
  products: [],
  fetchProducts: async (limit, skip, search = "", category = "") => {
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`;
    if (search) url = `https://dummyjson.com/products/search?q=${search}`;
    if (category) url = `https://dummyjson.com/products/category/${category}`;

    const res = await fetch(url);
    const data = await res.json();
    set({ products: data.products });
  },
}));

export default useProductStore;
