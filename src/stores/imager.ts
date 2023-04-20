import { toRaw } from "vue";
import { defineStore, acceptHMRUpdate } from "pinia";
import {
  Cog6ToothIcon,
  PlusSmallIcon,
  ServerIcon,
  BoltIcon,
} from "@heroicons/vue/24/solid";

export const useImagerStore = defineStore({
  id: "imager",
  state: () => ({
    selectedDisk: null as null | string,
    selectedImageFile: null as null | string,
    steps: [
      {
        name: "Flash from file",
        complete: false,
        solidIcon: PlusSmallIcon,
      },
      {
        name: "Select Disk",
        complete: false,
        solidIcon: ServerIcon,
      },
      {
        name: "Customize",
        complete: false,
        solidIcon: Cog6ToothIcon,
      },
      {
        name: "Flash",
        complete: false,
        solidIcon: BoltIcon,
      },
    ],
  }),
  actions: {
    completeStep(idx: number) {
      this.$patch((state) => {
        state.steps[idx].complete = true;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagerStore, import.meta.hot));
}
