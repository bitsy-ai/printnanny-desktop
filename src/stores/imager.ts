import { defineStore, acceptHMRUpdate } from "pinia";
import { Cog6ToothIconOutline } from "@heroicons/vue/24/outline";
import { Cog6ToothIconSolid } from "@heroicons/vue/24/outline";

export const useImagerStore = defineStore({
  id: "imager",
  state: () => ({
    selectedImageFile: null as null | string,
    steps: [
      {
        name: "Flash from file",
        complete: false,
        solidIcon: Cog6ToothIconSolid,
        outlineIcon: Cog6ToothIconSolid,
      },
      {
        name: "Customize",
        complete: false,
        solidIcon: Cog6ToothIconSolid,
        outlineIcon: Cog6ToothIconSolid,
      },
      {
        name: "Select Disk",
        complete: false,
        solidIcon: Cog6ToothIconSolid,
        outlineIcon: Cog6ToothIconSolid,
      },
      {
        name: "Flash",
        complete: false,
        solidIcon: Cog6ToothIconSolid,
        outlineIcon: Cog6ToothIconSolid,
      },
    ],
  }),
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useImagerStore, import.meta.hot));
}
