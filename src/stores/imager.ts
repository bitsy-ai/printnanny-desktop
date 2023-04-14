import { defineStore, acceptHMRUpdate } from "pinia";

export const useImagerStore = defineStore({
  id: "imager",
  state: () => ({
    selectedImageFile: null as null | string,
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagerStore, import.meta.hot));
}
