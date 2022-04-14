import { defineStore } from "pinia";

export const useBoardsStore = defineStore({
  id: "boards",
  state: () => ({ title: "1st board" }),
  getters: {},
  actions: {},
});
