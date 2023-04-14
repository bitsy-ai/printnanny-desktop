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
    selectedImageFile: null as null | string,
    currentStepIdx: 0,
    steps: [
      {
        name: "Flash from file",
        complete: false,
        solidIcon: PlusSmallIcon,
      },
      {
        name: "Customize",
        complete: false,
        solidIcon: Cog6ToothIcon,
      },
      {
        name: "Select Disk",
        complete: false,
        solidIcon: ServerIcon,
      },
      {
        name: "Flash",
        complete: false,
        solidIcon: BoltIcon,
      },
    ],
  }),
  actions: {
    nextStep() {
      this.$patch((state) => {
        state.steps[state.currentStepIdx].complete = true;
        state.currentStepIdx = state.currentStepIdx + 1;
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagerStore, import.meta.hot));
}
